const models = {
    user: {
        fullname: "",
        email: "",
        role: "",
        // id: "",
        password: ""
    },
    report: {
        id: "",
        title: "",
        description: "",
        priority: "",
        picture: "",
        region: {
            longitudeDelta: 0,
            latitudeDelta: 0,
            latitude: 0,
            longitude: 0,
        },
        // latitude: "",
        // longitude: "",
        solved: false,
        verified: false,
        user: { name: "", email: "" },
        // date: new Date().toLocaleDateString("en-US"),
        date: 0,
        comments: []
    }
}

export default models;