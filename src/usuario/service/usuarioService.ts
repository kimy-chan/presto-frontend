import { instance } from "../../config/instance";
import { response } from "../../core/interface/response";
import { ResponseOneI } from "../../core/interface/responseOne";
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

export const usuarioOne = async (
  usuario: string
): Promise<ResponseOneI<CrearUsuarioI>> => {
  try {
    const response = await instance.get(`usuario/${usuario}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editarUsuario = async (
  usuario: string,
  data: CrearUsuarioI
): Promise<response> => {
  try {
    const response = await instance.patch(`usuario/${usuario}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const eliminarUsuario = async (usuario: string): Promise<response> => {
  try {
    const response = await instance.delete(`usuario/${usuario}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
