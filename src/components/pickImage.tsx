import React from "react";
import DefaultImg from "../assets/picture.png";
interface IPickImage {
    value: string,
    onChange: (value: string) => void
}
function PickImage(props: IPickImage) {

    const OnUploadPhotoClicked = (event: any) => {
        console.log("Event: ")
        if(event.target.files[0]) {
            const reader = new FileReader();
            reader.addEventListener("load", () => props.onChange(reader.result as string), false)
            reader.readAsDataURL(event.target.files[0])
        }
    }
    return (
        <div style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }} >
            <input id="inputImage" accept="image/*" type="file" style={{ display: "none" }} onChange={OnUploadPhotoClicked} />
            <label htmlFor="inputImage">
                {props.value != "" && <img src={props.value} style={{...cursor, borderRadius: 10}} height={150} width="auto" />}
                {props.value == "" && <img src={DefaultImg} style={cursor} width={150} />}
            </label> <br />
            <label htmlFor="inputImage">
                <span style={cursor} >Seleccionar</span>
            </label>
        </div>
    )
}

const cursor = { cursor: "pointer" }

export default PickImage;