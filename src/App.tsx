import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { GlobalContext, IGlobalContext } from "./contexts/global";
//Containers
import Container from "./routes/container";
import Login from "./routes/login";


function App() {
  const auxSetContext = (object: any) => {
    setContext({ ...context, ...object });
  }
  const [context, setContext] = useState<IGlobalContext>({
    user: { fullname: "" },
    logged: false,
    setContext: auxSetContext
  })

  return (
    <GlobalContext.Provider value={{ ...context, setContext: auxSetContext }} >
      {context.logged ? <Container /> : <Login />}
      <ToastContainer />
    </GlobalContext.Provider>
  )
}

export default App;