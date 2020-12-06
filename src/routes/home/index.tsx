import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Grid, IconButton, Typography } from "@material-ui/core";
import { Check, CheckCircle } from "@material-ui/icons";
//Utils
import { Content, Separator, Title, View } from "../../globalStyles";
import { Collections, COLORS, Documents, Keys } from "../../utils/enums";
import { IFPost } from "../../utils/interfaces";
import ModalViewMore from "./modalViewMore"
//Service
import { getDb, updateReports } from "../../service/firestore";
import models from "../../utils/models";
import { toast } from "react-toastify";

function Home(props: any) {
    const [modals, setModals] = useState({ viewMore: false });
    const [data, setData] = useState([]);
    const [highCards, setHighCards] = useState([]);
    const [medCards, setMedCards] = useState([]);
    const [lowCards, setLowCards] = useState([]);
    const [selectedPost, setSelectedPost] = useState<IFPost>({...models.report});
    const [ loading, setLoading ] = useState(true); 
    

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
                    if (!element.solved) {
                        if (element.priority === Keys.HIGH) {
                            _high.push(element);
                        } else if (element.priority === Keys.MED) {
                            _med.push(element);
                        } else {
                            _low.push(element);
                        }
                        _data.push(auxObjects[keysObject[i]])
                    }
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
                setLoading(false);
            }
        })
    }

    const openModal = (name: string) => {
        setModals({...modals, [name]: true});
    }

    const closeModal = (name: string) => {
        setModals({...modals, [name]: false});
    }

    const onViewMore = (post: IFPost) => {
        setSelectedPost(post);
        openModal("viewMore");
    }

    const onSolved = async (post: IFPost) => {        
        const id = post.id;
        const _allPosts: IFPost[] = [...data];
        for (let i = 0; i < _allPosts.length; i++) {
            const el: IFPost = _allPosts[i];
            if (el.id === id) {
                _allPosts[i].solved = true;
                break;
            }
        }

        try {
            await updateReports(_allPosts);
            toast.success("Reporte actualizado");
        } catch (error) {
            toast.error(error.message);
        }
    }
    
    

    return (
        <View>
            <Title color={COLORS.PRIMARY}  >Reportes</Title>
            <Separator />
            <Title color={COLORS.HIGH_PRIORITY} size={24}  >Prioridad Alta</Title>
            {loading && <CircularProgress/>}
            <Grid container spacing={1} >
                {highCards.map((post, key) => {
                    return (
                        <CardReport post={post} onSolved={onSolved} onViewMore={onViewMore} key={key} />
                    )
                })}
            </Grid>
            <Title color={COLORS.MED_PRIORITY} size={24} >Prioridad Media</Title>
            {loading && <CircularProgress/>}
            <Grid container spacing={1} >
                {medCards.map((post, key) => {
                    return (
                        <CardReport post={post} onSolved={onSolved} onViewMore={onViewMore} key={key} />
                    )
                })}
            </Grid>
            <Title color={COLORS.LOW_PRIORITY} size={24} >Prioridad Baja</Title>
            {loading && <CircularProgress/>}
            <Grid container spacing={1} >
                {lowCards.map((post, key) => {
                    return (
                        <CardReport post={post} onSolved={onSolved} onViewMore={onViewMore} key={key} />
                    )
                })}
            </Grid>
            <ModalViewMore open={modals.viewMore} onClose={() => closeModal("viewMore")} allPosts={data} post={selectedPost as IFPost} />
        </View>
    )
}

interface ICardReport {
    post: IFPost,
    onViewMore: (post: IFPost) => void,
    onSolved: (post: IFPost) => void,

}

const CardReport = (props: ICardReport) => {
    return (
        <Grid item sm={4}>
            {/* <Card  > */}
            <Card style={{ height: props.post.picture !== "" ? 449.859 : 200 }} >
                <CardHeader avatar={<Avatar>{props.post.user.name[0]}</Avatar>} title={props.post.user.name} subheader={new Date(props.post.date).toDateString()} />
                {props.post.picture !== "" && <CardMedia image={props.post.picture} style={{
                    height: 0,
                    paddingTop: '56.25%'
                }} />}
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {(props.post.title).substring(0, 100) + "..."}
                    </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between" }} >
                    <Button onClick={() => props.onViewMore(props.post)} >Ver más</Button>
                    <IconButton onClick={() => props.onSolved(props.post)} >
                        <CheckCircle />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Home;