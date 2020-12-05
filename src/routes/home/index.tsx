import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from "@material-ui/core";
import { Check, CheckCircle } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Content, Separator, Title, View } from "../../globalStyles";
import { getDb } from "../../service/firestore";
import { Collections, COLORS, Documents, Keys } from "../../utils/enums";
import { IFPost } from "../../utils/interfaces";

function Home(props: any) {
    const [data, setData] = useState([]);
    const [highCards, setHighCards] = useState([]);
    const [medCards, setMedCards] = useState([]);
    const [lowCards, setLowCards] = useState([]);

    useEffect(() => {
        observerPosts();
    }, [])

    const observerPosts = async () => {
        getDb().collection(Collections.REPORTS).doc(Documents.DATA).onSnapshot(observer => {
            if (observer.data()) {
                console.log("Dentro")
                //@ts-ignore
                const keysObject = Object.keys(observer.data());
                const auxObjects = { ...observer.data() };
                let _data: any = [];
                let _high: any = []; let _med: any = []; let _low: any = [];
                for (let i = keysObject.length - 1; i >= 0; i--) {
                    const element: IFPost = auxObjects[keysObject[i]];
                    if(!element.solved) {
                        if (element.priority === Keys.HIGH) {
                            _high.push(element);
                        } else if (element.priority === Keys.MED) {
                            _med.push(element);
                        } else {
                            _low.push(element);
                        }
                    }
                    // _data.push(auxObjects[keysObject[i]])
                }
                // console.log("Datos: ", (_data as IFPost[]).sort((a, b) => a.date - b.date))
                console.log("Items: ", _data)
                //@ts-ignore
                setData((_data as IFPost[]).sort((a, b) => b.date - a.date));
                //@ts-ignore
                setHighCards((_high as IFPost[]).sort((a, b) => b.date - a.date));
                //@ts-ignore
                setMedCards((_med as IFPost[]).sort((a, b) => b.date - a.date));
                //@ts-ignore
                setLowCards((_low as IFPost[]).sort((a, b) => b.date - a.date));
            }
        })
    }
    return (
        <View>
            <Title color={COLORS.PRIMARY}  >Reportes</Title>
            <Separator />
            <Title color={COLORS.HIGH_PRIORITY}  size={24}  >Prioridad Alta</Title>
            <Grid container spacing={1} >
                {highCards.map((post, key) => {
                    return (
                        <CardReport {...post} key={key} />
                    )
                })}
            </Grid>
            <Title color={COLORS.MED_PRIORITY}  size={24} >Prioridad Media</Title>
            <Grid container spacing={1} >
                {medCards.map((post, key) => {
                    return (
                        <CardReport {...post} key={key} />
                    )
                })}
            </Grid>
            <Title color={COLORS.LOW_PRIORITY}  size={24} >Prioridad Baja</Title>
            <Grid container spacing={1} >
                {lowCards.map((post, key) => {
                    return (
                        <CardReport {...post} key={key} />
                    )
                })}
            </Grid>
        </View>
    )
}


const CardReport = (props: IFPost) => {
    return (
        <Grid item sm={4}>
            {/* <Card  > */}
            <Card style={{ height: props.picture !== "" ? 449.859 : 200 }} >
                <CardHeader avatar={<Avatar>{props.user.name[0]}</Avatar>} title={props.user.name} subheader={new Date(props.date).toDateString()} />
                <CardMedia image={props.picture} style={{
                    height: 0,
                    paddingTop: '56.25%'
                }} />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {(props.title).substring(0, 100) + "..."}
                    </Typography>
                </CardContent>
                <CardActions style={{justifyContent: "space-between"}} >
                    <Button>Ver más</Button>
                    <IconButton>
                        <CheckCircle/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Home;