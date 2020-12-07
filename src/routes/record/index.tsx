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
    const [dataPerPriority, setDtaPerPriority] = useState([]);
    const [dataPerSolved, setDataPerSolved] = useState([]);

    useEffect(() => {
        observerPosts();
    }, [])

    const observerPosts = async () => {
        getDb().collection(Collections.REPORTS).doc(Documents.DATA).onSnapshot(observer => {
            if (observer.data()) {
                const chartQ1 = [
                    { label: t("Alta"), value: 0 },
                    { label: t("Media"), value: 0 },
                    { label: t("Baja"), value: 0 },
                ];
                const chartQ2 = [
                    { label: t("Solucionado"), value: 0 },
                    { label: t("No Solucionado"), value: 0 },
                ];
                //@ts-ignore
                const keysObject = Object.keys(observer.data());
                const auxObjects = { ...observer.data() };
                let _data: any = [];
                let _high: any = []; let _med: any = []; let _low: any = [];
                for (let i = keysObject.length - 1; i >= 0; i--) {
                    const element: IFPost = auxObjects[keysObject[i]];
                    _data.push({ ...auxObjects[keysObject[i]], solved: auxObjects[keysObject[i]].solved ? "Sí" : "No" });
                    if (auxObjects[keysObject[i]].priority === "Alta") {
                        chartQ1[0].value++;
                        chartQ1[0].label = `Alta ${((chartQ1[0].value/keysObject.length)*100).toFixed(1)}%`;
                    } else if (auxObjects[keysObject[i]].priority === "Media") {
                        chartQ1[1].value++;
                        chartQ1[1].label = `Media ${((chartQ1[1].value/keysObject.length)*100).toFixed(1)}%`;
                    } else {
                        chartQ1[2].value++;
                        chartQ1[2].label = `Baja ${((chartQ1[2].value/keysObject.length)*100).toFixed(1)}%`;
                    }
                    
                    
                    if (auxObjects[keysObject[i]].solved) {
                        chartQ2[0].value++;
                        chartQ2[0].label = `Solucionado ${((chartQ2[0].value/keysObject.length)*100).toFixed(1)}%`;
                    } else {
                        chartQ2[1].value++;
                        chartQ2[1].label = `No Solucionado ${((chartQ2[1].value/keysObject.length)*100).toFixed(1)}%`;
                    }
                }

                //@ts-ignore
                setDtaPerPriority(chartQ1); setDataPerSolved(chartQ2);
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
                                { title: t("Fecha"), render: (row: any) => new Date(row.date).toLocaleDateString("en") },
                                // { title: t("¿Primera vez?"), field: "firstTime" },
                            ]}
                            isLoading={loading}
                            data={data}
                        // onRowClick={seePhoto}
                        />
                    </Paper>
                </Grid>
                <Grid item sm={6} xs={12} >
                    <Title>{t("Reportes por prioridad")}</Title>
                    <Chart data={dataPerPriority} >
                        <Legend />
                        <PieSeries valueField="value" argumentField="label" />
                    </Chart>
                </Grid>
                <Grid item sm={6} xs={12} >
                    <Title>{t("Reportes solucionados")}</Title>
                    <Chart data={dataPerSolved} >
                        <Legend />
                        <PieSeries valueField="value" argumentField="label" />
                    </Chart>
                </Grid>
                <ModalImage open={modalItems} img={image} onClose={() => setModalsItems(false)} />
            </Grid>

        </React.Fragment >
    )
}

export default withNamespaces()(Rent);