import { instance } from "../../config/instance";
import { response } from "../../core/interface/response";
import { DataClienteI } from "../../lectura/interface/dataCliente";
import { DataMedidorClienteI } from "../interface/dataMedidorCliente";
import { FormMedidorI } from "../interface/formMedidor";
import { MedidorCliente } from "../interface/medidorCliente";

export const crearMedidor = async (data: FormMedidorI): Promise<response> => {
  try {
    const response = await instance.post("medidor", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const buscarMedidor = async (
  numeroMedidor: string
): Promise<DataClienteI> => {
  try {
    const response = await instance.get(`medidor/buscar/${numeroMedidor}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listarMedidor = async (): Promise<MedidorCliente[]> => {
  try {
    const response = await instance.get("medidor");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const medidorCliente = async (
  cliente: string
): Promise<DataMedidorClienteI[]> => {
  try {
    const response = await instance.get(`medidor/cliente/${cliente}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
