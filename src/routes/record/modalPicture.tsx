import React from "react";
import { Dialog, DialogContent, FormControl, DialogActions, Button, Grid } from "@material-ui/core";
import { withNamespaces } from "react-i18next";
import { Title } from "../../globalStyles";

interface IModalItems {
    open: boolean,
    selectedItem: any,
    img: string
    onClose: () => void,

}

function ModalItems(props: IModalItems | any) {

    const t = (props as any).t;


    const onClose = () => {
        props.onClose();
    }

    return (
        <Dialog open={props.open} onClose={onClose}  maxWidth="md" fullWidth >
            <DialogContent>
                {props.img !== ""?<img src={props.img} style={{objectFit: "cover", width: "100%", height: "100%"}} />: <Title>No hay imagen</Title>}
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={() => props.onClose()} >{t("Close")}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default withNamespaces()(ModalItems);