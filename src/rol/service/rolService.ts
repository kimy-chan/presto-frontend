import { instance } from "../../config/instance";
import { response } from "../../core/interface/response";
import { DataRol } from "../interface/dataRo";
import { ListarRolesI } from "../interface/ListarRoles";

export const crearRol = async (data: DataRol): Promise<response> => {
  try {
    const renponse = await instance.post("rol", data);
    return renponse.data;
  } catch (error) {
    throw error;
  }
};

export const listarRolesPublic = async (): Promise<ListarRolesI[]> => {
  try {
    const renponse = await instance.get("rol/publicas");
    return renponse.data;
  } catch (error) {
    throw error;
  }
};

export const listarRolUser = async (): Promise<ListarRolesI> => {
  try {
    const renponse = await instance.get("rol/user");
    return renponse.data;
  } catch (error) {
    throw error;
  }
};
