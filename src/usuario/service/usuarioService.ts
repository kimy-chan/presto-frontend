import { instance } from "../../config/instance";
import { response } from "../../core/interface/response";
import { CrearUsuarioI } from "../interface/crearUsuario";
import { ListarUsuariosI } from "../interface/listarUsuarios";

export const crearUsuario = async (data: CrearUsuarioI): Promise<response> => {
  try {
    const response = await instance.post("usuario", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listarUsuarios = async (): Promise<ListarUsuariosI[]> => {
  try {
    const response = await instance.get("usuario");
    return response.data;
  } catch (error) {
    throw error;
  }
};
