import React, { useState, useContext } from "react";
import { Title, View, SquareView, Separator } from "../../globalStyles";
import { Button, CircularProgress } from "@material-ui/core";
import { withNamespaces } from "react-i18next";
import { toast } from "react-toastify";
//Custom components
import TextField from "../../components/_textField";
import { COLORS, Keys } from "../../utils/enums";
//Services
import { SetStorage } from "../../utils/functions";
import { GlobalContext, IUser } from "../../contexts/global";
import { authenticate } from "../../service/firestore";
//Utils
import "./login.css"
function Login({ t }: any) {
    const [form, setform] = useState({ username: "ronal2w@gmail.com", password: "nobulto123" });
    const [loading, setLoading] = useState(false);
    const globalContext = useContext(GlobalContext);

    const handleInputs = (name: string, value: string) => {
        setform({ ...form, [name]: value });
        console.log(form)
    }

    const logIn = async () => {
        setLoading(true);
        // FirestoreService.setDummyData()
        try {
            // const auth = await authenticate(form.username, form.password);
            await authenticate(form.username, form.password);
            globalContext.setContext({ ...globalContext, logged: true });
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false);

        // authenticate(form.username, form.password)
        //     .then(async result => {
        //         //Logged
        //         globalContext?.setContext({ ...globalContext, logged: true });
        //         setLoading(false);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         toast.error(error.message)
        //         setLoading(false);
        //     })
    }

    return (
        <React.Fragment>
            <View centered fullsize color="#2c3e50" style={{overflowY: "hidden"}} >

                <div className="shape">
                    <View centered style={{ transform: "rotate(45deg)", flex: "display", height: 400, backgroundColor: "rgba(0,0,0,0)" }}>
                        {/* <Title centered color="white" bold  >Yaque Rescate</Title> */}
                        <TextField label={t("User")} variant="filled" name="username" value={form.username} onChange={handleInputs} />
                        <Separator />
                        <TextField label={t("Password")} variant="filled" name="password" password value={form.password} onChange={handleInputs} />
                        <Separator />
                        <Separator />
                        <Button color="inherit" onClick={logIn} >
                            {loading && <CircularProgress size={20} />}
                            {!loading && t("Iniciar sesión")}
                        </Button>
                    </View>
                </div>

                {/* <SquareView  >
                    <Separator />
                    <Title centered >T E M P L A T E</Title>
                    <Separator />
                </SquareView> */}
            </View>
        </React.Fragment>
    )
}

export default withNamespaces()(Login);