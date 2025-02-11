import { RouterI } from "../../core/interface/router";
import { ClientePage } from "../page/clientePage";

export const  clienteRouter:RouterI[]=[
    {
        path:'/clientes',
        element:ClientePage
    }
]