import { RouterI } from "../../core/interface/router";
import { LecturaPage } from "../page/LecturaPage";
import { ListarLecturaPage } from "../page/ListarLecturaPage";
import { ReciboPage } from "../page/ReciboPage";

export const lecturaRouter: RouterI[] = [
  {
    path: "/lectura/registrar",
    element: LecturaPage,
  },
  {
    path: "/lectura/recibo/:id",
    element: ReciboPage,
  },
  {
    path: "/listar/lectura",
    element: ListarLecturaPage,
  },
];
