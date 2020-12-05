import React from "react";
import DefaultImg from "../assets/picture.png";
import { COLORS } from "../utils/enums";
interface IPickImage {
    value: string,
    name: string,
    onChange: (name: string, value: string) => void
}
function PickImage(props: IPickImage) {

    const OnUploadPhotoClicked = (event: any) => {
        console.log("Event: ")
        if (event.target.files[0]) {
            const reader = new FileReader();
            reader.addEventListener("load", () => props.onChange(props.name, reader.result as string), false)
            reader.readAsDataURL(event.target.files[0])
        }
    }
    return (
        <div style={{ width: "100%", height: 300, borderWidth: 1, borderColor: "black", borderStyle: "solid" }} >
            <div style={{ alignItems: props.value !== "" ? undefined : "center", justifyContent: "center", display: "flex", backgroundColor: COLORS.PRIMARY, height: "100%" }} >
                <input id="inputImage" accept="image/*" type="file" style={{ display: "none" }} onChange={OnUploadPhotoClicked} />
                <label htmlFor="inputImage">
                    {props.value !== "" && <img src={props.value} style={{ ...cursor, borderRadius: 0, objectFit: "cover", height: "100%", width: "100%" }} />}
                    {/* {props.value == "" && <img src={DefaultImg} style={cursor} width={150} />} */}
                </label> <br />
                {props.value === "" &&
                    <label htmlFor="inputImage">
                        <span style={{ ...cursor, color: "white", fontWeight: "bold", fontSize: 22 }} >Seleccionar portada</span>
                    </label>}
            </div>
        </div>
    )
}

const cursor = { cursor: "pointer" }

export default PickImage;