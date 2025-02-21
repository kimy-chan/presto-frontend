import { RouterI } from "../../core/interface/router";
import { ReciboPagoClientePage } from "../page/ReciboPagoClientePage";
import { RealizarPagoPage } from "../page/RealizarPagoPage";

export const pagoRouter: RouterI[] = [
  {
    path: "/realizar/pago",

    element: RealizarPagoPage,
  },

  {
    path: "/pago/imprimir/cliente/:medidor",

    element: ReciboPagoClientePage,
  },
];
