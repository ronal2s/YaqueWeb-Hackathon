import styled from '@emotion/styled'
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { Drawer_size } from '../utils/constants';
import { COLORS } from '../utils/enums';


const RowView = styled.div({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
})

const DrawerView = styled.div({
    width: Drawer_size
})

const NavigationView = styled.div({
    flex: 1,
})

const ContentView = styled.div({
    padding: 10
})

interface ISubtitle {
    marginLeft?: number,
    centered?: boolean,
    color?: string,
    bold?: boolean
}

const Subtitle = styled.h5((props: ISubtitle) => ({
    margin: 0,
    color: props.color ? props.color : undefined, fontWeight: props.bold ? "bold" : 400,
    marginLeft: props.marginLeft,
    textAlign: props.centered ? "center" : undefined,
}))

const Body = styled.p({
    margin: 0, fontWeight: 400, fontSize: 18
})

interface ITitle {
    centered?: boolean,
    bold?: boolean,
    color?: string,
    margin?: string | number,
    size?: string | number,
    clickeable?: boolean
}

const Title = styled.h1((props: ITitle) => ({
    textAlign: props.centered ? "center" : "left",
    fontWeight: props.bold ? 'bold' : 400,
    color: props.color ? props.color : "black",
    margin: props.margin ? props.margin : 0,
    fontSize: props.size ? props.size : 22,
    ":hover": props.clickeable ? {
        color: COLORS.PRIMARY,
        cursor: "pointer"
    } : {}
}))

interface IContent {
    flex?: "flex" | "grid" | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "block" | "inline" | "run-in" | "-ms-flexbox" | "-ms-grid" | "-webkit-flex",
    alignItems?: "inherit" | "initial" | "revert" | "unset" | "normal" | "center" | "end" | "start" | "flex-end" | "flex-start" | "self-end" | "self-start" | "baseline" | "stretch",
    justifyContent?: "left" | "right" | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "normal" | "center" | "end" | "start" | "flex-end" | "flex-start" | "stretch"
}

const Content = styled.div((props: IContent) => ({
    display: props.flex ? "flex" : undefined,
    alignItems: props.alignItems,
    justifyContent: props.justifyContent
}))

interface IView {
    centered?: boolean, column?: boolean, row?: boolean,
    justifyContent?: "left" | "right" | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "normal" | "center" | "end" | "start" | "flex-end" | "flex-start" | "stretch",
    alignItems?: "left" | "right" | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "normal" | "center" | "end" | "start" | "flex-end" | "flex-start" | "stretch",
    color?: any, height?: number | string,
    width?: string | number, fullsize?: boolean, borderRadius?: number, opacity?: number, marginLeft?: number, marginRight?: number, button?: boolean,
    wrap?: boolean, marginTop?: number,

}

const View = styled.div((props: IView) => ({
    display: props.centered || props.column || props.row ? "flex" : "",
    justifyContent: props.centered ? "center" : props.justifyContent ? props.justifyContent : "",
    alignItems: props.centered ? "center" : props.alignItems ? props.alignItems : undefined,
    backgroundColor: props.color ? props.color : "white",
    height: props.fullsize ? "100vh" : props.height ? props.height : undefined,
    width: props.fullsize ? "100%" : props.width ? props.width : undefined,
    flexDirection: props.column ? "column" : props.row ? "row" : "column",
    borderRadius: props.borderRadius ? props.borderRadius : "",
    opacity: props.opacity ? props.opacity : 1,
    marginLeft: props.marginLeft ? props.marginLeft : 0,
    marginRight: props.marginRight ? props.marginRight : 0,
    marginTop: props.marginTop ? props.marginTop : 0,
    cursor: props.button ? "pointer" : "",
    flexWrap: props.wrap ? "wrap" : undefined

}))

const SquareView = styled.div((props: any) => ({
    width: 300, height: 250,
    backgroundColor: "white",
    borderRadius: 10,
    boxShadow: "2px 3px 16px 3px",
}))

const Separator = styled.div((props: { size?: number }) => ({
    marginTop: props.size ? `${props.size}px` : "10px"
}))

interface IFabButton {
    onClick: () => void
}

const FabButton = (props: IFabButton) => {
    return (
        <Fab color="primary"
            style={{ position: "absolute", bottom: 10, right: 10 }} onClick={props.onClick} >
            <Add />
        </Fab>
    )
}


export {
    RowView,
    DrawerView,
    NavigationView,
    ContentView,
    Title,
    Subtitle,
    Body, Separator,
    Content, View, SquareView,
    FabButton
}