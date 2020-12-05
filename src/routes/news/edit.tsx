import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { toast } from "react-toastify";
//Custom components
import PickImage from "../../components/pickImage";
import CustomTextField from "../../components/_textField";
import { View } from "../../globalStyles";
//Utils
import * as FirestoreService from "../../service/firestore";

interface IEditNews {
    open: boolean,
    onClose: () => void
}

function EditNews(props: IEditNews) {
    const [toEdit, setToEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ title: "", body: "", uri: "", date: new Date().toLocaleDateString("en-US") })
    //toEdit es para editar la noticia, no se hará en esta primera fase

    const handleInputs = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    }

    const onPushNews = async () => {
        setLoading(true);
        try {
            await FirestoreService.pushNews(form);
            setForm({ ...form, title: "", body: "", uri: "" });
            toast.success("Noticia enviada");
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }


    return (
        <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="sm" >
            <DialogTitle>{toEdit ? "Editar noticia" : "Crear noticia"}</DialogTitle>
            <DialogContent>
                <Grid container spacing={1}  >
                    <Grid item sm={12}>
                        <PickImage value={form.uri} name="uri" onChange={handleInputs} />
                    </Grid>
                    <CustomTextField size={12} label="Título" name="title" value={form.title} variant="outlined" onChange={handleInputs} />
                    <CustomTextField size={12} rows={10} multiline label="Cuerpo" name="body" value={form.body} variant="outlined" onChange={handleInputs} />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" >Cerrar</Button>
                <Button disabled={loading} color="primary" variant="contained" onClick={onPushNews} >
                    {!loading && "Lanzar"}
                    {loading && <CircularProgress color="inherit" size={18} />}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditNews;