import React, { useContext, useState } from 'react';
import { Divider, List } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    BrowserRouter as Router, Switch, Route, Redirect,
} from "react-router-dom";
//Screens
import Home from "./home";
import News from "./news";
import Records from "./record";
//Custom components
import CustomAppBar from '../components/appbar';
import CustomLink from '../components/listItem';
import CustomDrawer from '../components/drawer';
//Utils
import { withNamespaces } from 'react-i18next';
import { isMobile } from '../utils/functions';
import { COLORS } from '../utils/enums';
//Custom styles
import { RowView, NavigationView, ContentView, Title } from '../globalStyles';
import { GlobalContext } from '../contexts/global';

function App({ t }: any) {

    const [drawer, setDrawer] = useState(!isMobile());
    const [actualRoute, setRoute] = useState("");

    const globalContext = useContext(GlobalContext);

    const handleDrawer = () => {
        setDrawer(!drawer)
    }

    const closeDrawer = () => setDrawer(false);

    const onClickItem = (name: string) => {
        setRoute(name);
    }

    return (
        <Router>
            <React.Fragment >
                <RowView >
                    <CustomDrawer open={drawer} closeDrawer={closeDrawer} >
                        <Header />
                        <Divider />
                        <List>
                            <CustomLink title={t("Inicio")} icon="mail" iconColor="white" nameView="/" actualRoute={actualRoute} onClick={onClickItem} />
                            <CustomLink title={t("Noticias")} icon="mail" iconColor="white" nameView="/news" actualRoute={actualRoute} onClick={onClickItem} />
                            <CustomLink title={t("Historial")} icon="mail" iconColor="white" nameView="/records" actualRoute={actualRoute} onClick={onClickItem} />
                        </List>
                    </CustomDrawer>
                    <NavigationView>
                        <CustomAppBar title={window.location.pathname} onMenuPress={handleDrawer} drawerOpened={drawer} />
                        <ContentView>
                            <Switch>
                                <Route path="/" exact component={Home} />
                                <Route path="/news" exact component={News} />
                                <Route path="/records" exact component={Records} />
                            </Switch>
                        </ContentView>
                    </NavigationView>
                </RowView>
                <ToastContainer />
            </React.Fragment>
        </Router>
    );
}

const Header = () => {
    return (
        <React.Fragment>
            <Divider />
                <Title color="white" centered>YaqueApp</Title>
            {/* <div style={{ backgroundColor: COLORS.PRIMARY_DARK, height: 100 }} >
            </div> */}
        </React.Fragment>
    )
}

export default withNamespaces()(App);
