import { RouterI } from "../../core/interface/router";
import { LecturaPage } from "../page/LecturaPage";

export const lecturaRouter:RouterI[]=[
    {
        path:'/lectura/registrar',
        element:LecturaPage
    }
]