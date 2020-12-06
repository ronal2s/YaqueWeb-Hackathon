import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Grid, Paper } from "@material-ui/core";
import {
    Chart,
    PieSeries,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';

import { withNamespaces } from 'react-i18next';
//Utils
import { isMobile } from "../../utils/functions";
import IRecord from "./index.d";
import { Title } from "../../globalStyles";
import { getData, getDb } from "../../service/firestore";
import ModalImage from "./modalPicture";
import { Documents, Collections, Keys } from "../../utils/enums";
import { IFPost } from "../../utils/interfaces";

function Rent({ t }: any) {
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IRecord | null>(null);
    const [modalItems, setModalsItems] = useState(false);
    const [image, setImage] = useState("");

    const [data, setData] = useState([]);

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

                    _data.push({ ...auxObjects[keysObject[i]], solved: auxObjects[keysObject[i]].solved ? "Sí" : "No" })
                }
                //@ts-ignore
                setData((_data as IFPost[]).sort((a, b) => b.solved - a.solved));
                setLoading(false);
            }
        })
    }

    return (
        <React.Fragment>
            <Grid container justify="flex-start" spacing={2} >
                <Grid item sm={12} xs={12} >
                    <Paper>
                        <MaterialTable
                            style={{ width: isMobile() ? 350 : "100%" }}
                            title="Reportes"
                            options={{
                                exportButton: true,
                                search: true
                            }}
                            columns={[
                                { title: t("Título"), field: "title" },
                                { title: t("Prioridad"), field: "priority" },
                                { title: t("Usuario"), field: "user.name" },
                                { title: t("Solucionado"), field: "solved" },
                                // { title: t("¿Primera vez?"), field: "firstTime" },
                            ]}
                            isLoading={loading}
                            data={data}
                        // onRowClick={seePhoto}
                        />
                    </Paper>
                </Grid>
                <ModalImage open={modalItems} img={image} onClose={() => setModalsItems(false)} />
            </Grid>

        </React.Fragment >
    )
}

export default withNamespaces()(Rent);