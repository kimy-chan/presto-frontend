import { RouterI } from "../../core/interface/router";
import { ListarRolPage } from "../page/ListarRolPage";

export const rolRouter: RouterI[] = [
  {
    path: "/listar/rol",

    element: ListarRolPage,
  },
];
