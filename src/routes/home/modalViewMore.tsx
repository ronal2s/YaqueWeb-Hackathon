import React, { useState } from "react";
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Icon, Paper, Typography } from "@material-ui/core";
import { CheckRounded, VerifiedUser, VerifiedUserOutlined } from "@material-ui/icons";
//@ts-ignore
import GoogleMapReact from 'google-map-react';
import { toast } from "react-toastify";
//Custom components
import PickImage from "../../components/pickImage";
import CustomTextField from "../../components/_textField";
import { View } from "../../globalStyles";
//Utils
import * as FirestoreService from "../../service/firestore";
import { COLORS } from "../../utils/enums";
import { getUIDCode } from "../../utils/functions";
import { IFComment, IFPost } from "../../utils/interfaces";

//@ts-ignore
const AnyReactComponent = ({ lat, lng }) => <Icon style={{ color: COLORS.PRIMARY }} size={24} >room</Icon>;

interface IModalPost {
    open: boolean,
    onClose: () => void,
    post: IFPost,
    allPosts: IFPost[]
}

function ModalPost(props: IModalPost) {
    const [newComment, setComment] = useState("");

    const handleInputs = (name: string, value: string) => {
        setComment(value);
    }


    const onSolved = () => {

    }

    const postComment = async () => {
        const obj = {
            id: getUIDCode(),
            userId: "test",
            text: newComment,
            name: "Administrador",
            verified: true
        }
        const _comments = [...props.post.comments];
        _comments.push(obj);
        const id = props.post.id;
        const _allPosts = [...props.allPosts];
        for (let i = 0; i < _allPosts.length; i++) {
            const el = _allPosts[i];
            if (el.id === id) {
                _allPosts[i].comments = [..._comments];
                break;
            }
        }

        try {
            await FirestoreService.updateReports(_allPosts);
            setComment("");
            toast.success("Comentario publicado");
        } catch (error) {
            toast.error(error.message);
        }
    }

    const goToLocation = () => {
        window.open(`https://www.google.com/maps/search/${props.post.region.latitude},+${props.post.region.longitude}/@${props.post.region.latitude},${props.post.region.longitude},17z`)
    }


    return (
        <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="sm" >
            <DialogTitle>{props.post.title}</DialogTitle>
            <CardHeader avatar={<Avatar>{props.post.user.name[0]}</Avatar>} title={props.post.user.name} subheader={new Date(props.post.date).toDateString()} />
            <DialogContent>
                <Grid container spacing={1}  >
                    <Grid item sm={12}>
                        <CardMedia image={props.post.picture} style={{
                            height: 0,
                            paddingTop: '56.25%'
                        }} />
                    </Grid>
                    <DialogContentText style={{width: "100%"}} >
                        {props.post.description}
                        <br />
                        {props.post.region.latitude &&
                            <div>

                                <div style={{ height: 400, width: "100%" }}>
                                    <GoogleMapReact
                                        bootstrapURLKeys={{ key: "AIzaSyAyHYyijB8VhsVv0LnIxMxFvbYn5u1Koo4" }}
                                        // defaultCenter={this.props.center}
                                        defaultCenter={{ lat: props.post.region.latitude, lng: props.post.region.longitude }}
                                        defaultZoom={15}
                                    >
                                        <AnyReactComponent
                                            lat={props.post.region.latitude}
                                            lng={props.post.region.longitude}
                                        />
                                    </GoogleMapReact>
                                </div>
                                <Button onClick={goToLocation} >Ir a la ubicación</Button>
                            </div>
                        }
                    </DialogContentText>
                    {(props.post.comments as IFComment[]).map((comment: IFComment, key: number) => {
                        return (
                            <Paper variant="outlined" style={{ width: "100%" }}>
                                {comment.verified ? <CardHeader avatar={<Avatar style={{ backgroundColor: COLORS.PRIMARY }} >{<VerifiedUser />}</Avatar>} title={comment.name} /> :
                                    <CardHeader avatar={<Avatar>{comment.name[0]}</Avatar>} title={comment.name} />
                                }
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {comment.text}
                                    </Typography>
                                </CardContent>
                            </Paper>
                        )
                    })}
                    {/* <Typography variant="body2" color="textSecondary" component="p">
                    </Typography> */}
                </Grid>
                <CustomTextField fullwidth multiline rows={4} label="Comentar" name="newComment" value={newComment} onChange={handleInputs} />
                <Button color="primary" onClick={postComment} >
                    Publicar
                </Button>
            </DialogContent>
            <DialogActions>
                <DialogActions>
                    <Button color="secondary" onClick={props.onClose} >Cerrar</Button>
                    {/* <Button color="primary" variant="contained" onClick={onSolved} >
                        Solucionado
                </Button> */}
                </DialogActions>
            </DialogActions>
        </Dialog>
    )
}

export default ModalPost;