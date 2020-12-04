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
import { Documents, Collections } from "../../utils/enums";

function Rent({ t }: any) {
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IRecord | null>(null);
    const [modalItems, setModalsItems] = useState(false);
    const [image, setImage] = useState("");

    const [data, setdata] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {

        setLoading(true);
        getDb().collection(Collections.REPORTS).doc(Documents.DATA).onSnapshot((result: any) => {
            let data: any = result.data();
            if (data) {
                data = data.data;
                console.log("Data fetch", data)
                setdata(data);
                setLoading(false);
            }
        })
    }

    const seePhoto = (e: any, rowData: any) => {
        setModalsItems(true);
        setImage(rowData.picture)
    }

    return (
        <React.Fragment>
            <Grid container justify="flex-start" spacing={2} >
                <Grid item sm={12} xs={12} >
                    <Paper>
                        <MaterialTable
                            style={{ width: isMobile() ? 350 : "100%" }}
                            title=""
                            options={{
                                exportButton: true,
                                search: false
                            }}
                            columns={[
                                // { title: t("Sector"), field: "sector" },
                                // { title: t("Calle"), field: "street" },
                                // { title: t("¿Primera vez?"), field: "firstTime" },
                            ]}
                            isLoading={loading}
                            data={data}
                            onRowClick={seePhoto}
                        />
                    </Paper>
                </Grid>
                <ModalImage open={modalItems} img={image} onClose={() => setModalsItems(false)} />
            </Grid>

        </React.Fragment >
    )
}

export default withNamespaces()(Rent);