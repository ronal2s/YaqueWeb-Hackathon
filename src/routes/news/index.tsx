import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Button, Fab, Grid, Paper } from "@material-ui/core";
import { withNamespaces } from 'react-i18next';
//Utils
import { FabButton, View } from "../../globalStyles";
import { isMobile } from "../../utils/functions";
import { Documents, Collections } from "../../utils/enums";
import ModalEditNews from "./edit";
import * as FirestoreService from "../../service/firestore";
import { toast } from "react-toastify";

function News({ t }: any) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [modals, setModals] = useState({ edit: false, item: false });


    useEffect(() => {
        // fetchData();
        observerNews();
    }, []);

    const observerNews = async () => {
        FirestoreService.getDb().collection(Collections.NEWS).doc(Documents.DATA).onSnapshot(observer => {
            if (observer.data()) {
                console.log("Datos obs: ", observer.data())
                //@ts-ignore
                const keysObject = Object.keys(observer.data());
                const auxObjects = { ...observer.data() };
                let _data: any = [];
                keysObject.forEach(key => {
                    //@ts-ignore
                    _data.push(auxObjects[key])
                })
                setData(_data)
            }
        })
    }

    const fetchData = async () => {
        setLoading(true);
        try {
            const _data = await FirestoreService.getNews();
            setData(_data);
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    const onAddNews = () => {
        setModals({ ...modals, edit: true });
    }

    const onCloseModalNews = () => {
        setModals({ ...modals, edit: false });
    }


    return (
        <React.Fragment>
            <Grid container justify="flex-start" spacing={2} >
                <Grid item sm={12} xs={12} >
                    <Paper>
                        <MaterialTable
                            style={{ width: isMobile() ? 350 : "100%" }}
                            title="Noticias"
                            options={{
                                exportButton: true,
                                search: false
                            }}
                            columns={[
                                { title: t("Título"), field: "title" },
                                { title: t("Cuerpo"), field: "body" },
                                { title: t("Fecha"), field: "date" },
                                // { title: t("Calle"), field: "street" },
                                // { title: t("¿Primera vez?"), field: "firstTime" },
                            ]}
                            isLoading={loading}
                            data={data}
                        // onRowClick={seePhoto}
                        />
                    </Paper>
                </Grid>
                {/* <ModalImage open={modalItems} img={image} onClose={() => setModalsItems(false)} /> */}
            </Grid>
            <FabButton onClick={onAddNews} />
            <ModalEditNews open={modals.edit} onClose={onCloseModalNews} />
        </React.Fragment >
    )
}
export default withNamespaces()(News)
// export default News;