import { RouterI } from "../../core/interface/router";

import { CrearRolPage } from "../page/CrearRolPage";
import { ListarRolPage } from "../page/ListarRolPage";

export const rolRouter: RouterI[] = [
  {
    path: "/listar/rol",

    element: ListarRolPage,
  },
  {
    path: "/crear/rol",

    element: CrearRolPage,
  },
];
