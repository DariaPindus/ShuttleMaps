export interface GooglePoint {
    lat: number,
    lng: number, 
}

export interface Point {
    title: string, 
    location: GooglePoint
}

export interface Route {
    name: string, 
    interval: number, 
    checkpoints: Point[]
}

export interface ReactContainer {
    children: JSX.Element[] | JSX.Element
}