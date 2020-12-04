import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid, GridSize } from "@material-ui/core";

interface iCustomPicker {
    label?: string,
    name?: string,
    value?: string,
    objLabel?: string,
    // list?: string[] | number[],
    list?: any[],
    size?: number,
    error?: boolean | string,
    placeholder?: string,
    onChange?: (name: string, value: string | number) => void,
    fullwidth?: boolean,
    variant?: "filled" | "standard" | "outlined",
    objValue?: string
}

function CustomPicker(props: iCustomPicker) {

    const _onChange = (e: any) => {
        if (props.onChange && props.name) {
            props.onChange(props.name, props.objValue? e.target.value[props.objValue]: e.target.value);
        } 
        else {
            console.warn("Props.name and Props.onChange not passed ")
        }
    }

    const error = typeof props.error === "boolean" ? props.error : false;

    if (props.fullwidth) {
        return (
            <FormControl variant={props.variant} style={{ width: "100%" }} >
                <InputLabel>{props.label}</InputLabel>
                <Select variant={props.variant} value={props.value} placeholder={props.placeholder} onChange={_onChange} error={error} >
                    {props.list?.map((value, i) => {
                        return (
                            <MenuItem value={props.objLabel ? value : value} key={i} >{props.objLabel ? value[props.objLabel] : value}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        )
    }

    return (
        <Grid item xs={12} sm={props.size as GridSize}>
            <FormControl variant={props.variant} style={{ width: "100%" }}  >
                <InputLabel>{props.label}</InputLabel>
                <Select variant={props.variant} value={props.value} placeholder={props.placeholder} onChange={_onChange} error={error} >
                    {props.list?.map((value, i) => {
                        return (
                            <MenuItem value={props.objLabel ? value : value} key={i} >{props.objLabel ? value[props.objLabel] : value}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Grid>
    )
}

export default CustomPicker;