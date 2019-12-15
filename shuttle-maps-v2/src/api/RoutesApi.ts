import axios from "axios";
import { Route } from "../types";

export async function getRoutes (selected: string) {
    const resp = await axios.get("/routes", {
        params : {
            selected: selected
        }
    });
    return resp.data as Route[];
}