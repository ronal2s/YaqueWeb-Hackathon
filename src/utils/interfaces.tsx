export interface IFNews {
    title: string,
    body: string,
    uri: string,
    date: string,
}


export interface IFPost {
    id: string,
    title: string,
    description: string,
    priority: string,
    picture: string,
    region: {
        longitudeDelta: number,
        latitudeDelta: number,
        latitude: number,
        longitude: number,
    },
    // latitude: string,
    // longitude: string,
    solved: boolean,
    date: number,
    verified?: boolean,
    user: { name: string, email?: string },
    comments: {
        id: string, userId: string, text: string, name: string, verified?: boolean
    }[] | []
}

export interface IFComment {
    id: string, userId: string, text: string, name: string, verified?: boolean
}