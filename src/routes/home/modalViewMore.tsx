import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Typography } from "@material-ui/core";
import { CheckRounded, VerifiedUser, VerifiedUserOutlined } from "@material-ui/icons";
import React, { useState } from "react";
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
                    <DialogContentText>
                        {props.post.description}
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
                    <Button color="primary" variant="contained" onClick={onSolved} >
                        Resuelto
                </Button>
                </DialogActions>
            </DialogActions>
        </Dialog>
    )
}

export default ModalPost;