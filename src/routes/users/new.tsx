import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, FormControl, DialogActions, Button } from "@material-ui/core";
import { toast } from "react-toastify";
//Custom components
import TextField from "../../components/_textField";
import TextPicker from "../../components/_textSelect";
//Utils
import IUser from "./index.d";
import models from "../../utils/models";
import { withNamespaces } from "react-i18next";

interface IModalNew {
    open: boolean,
    selectedItem: IUser | null,
    onClose: () => void,

}

function ModalNew(props: IModalNew | any) {
    // const [form, setForm] = useState({ name: "Miguel", lastname: "Paulino", phone: "809413265" });
    const [form, setForm] = useState({ ...models.user });
    const t = (props as any).t;

    const onEntering = () => {
        if (props.selectedItem) {
            setForm({ ...props.selectedItem as any })
        }
    }

    const onClose = () => {
        setForm({ ...models.user });
        props.onClose();
    }

    const handleInputs = (name: string, value: any) => {
        setForm({ ...form, [name]: value });
    }

    const addNewItem = () => {
       //Firestore call
    }


    return (
        <Dialog open={props.open} onClose={onClose} onEntering={onEntering} >
            <DialogTitle>{props.selectedItem ? t("Actualizar") : t("Nuevo")} {t("Usuario")}</DialogTitle>
            <DialogContent>
                <FormControl>
                    <TextField label={t("Nombres")} name="fullname" value={form.fullname} onChange={handleInputs} />
                    <TextField label={t("Correo")} name="user" value={form.email} onChange={handleInputs} />
                    {/* <TextField label="Role" name="role" value={form.role} onChange={handleInputs} /> */}
                    <TextPicker label={t("Rol")} name="role" list={["ADMIN", "USER"]} value={form.role} onChange={handleInputs} />
                    <TextField label={t("Clave")} name="password" value={form.password} password onChange={handleInputs} />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={() => props.onClose()} >{t("Cerrar")}</Button>
                <Button variant="contained" color="primary" onClick={addNewItem} >
                    {t("Aceptar")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withNamespaces()(ModalNew);