import { RouterI } from "../../core/interface/router";
import CrearMedidorPage from "../page/CrearMedidorPage";
import { MedidorPage } from "../page/MedidorPage";

export const medidorRouter:RouterI[] =[
    {
        path:'/medidor',
        element:MedidorPage
    },
     {
        path:'/medidor/crear',
        element:CrearMedidorPage
    }

]