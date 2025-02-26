import { instance } from "../../config/instance";
import { ParamsI } from "../../core/interface/params";
import { ResponseDataI } from "../../core/interface/responseData";
import { BuscadorLecturaI } from "../interface/buscadorLectura";

import { FormLecturaI } from "../interface/formLectura";
import { LecturaMedidorI } from "../interface/lecturaMedidor";
import { ListarLecturaI } from "../interface/listarLecturas";
import { ResponseReciboData } from "../interface/reciboData";

import { ResponseLecturaI } from "../interface/responseLectura";

export const crearLectura = async (
  data: FormLecturaI
): Promise<ResponseLecturaI> => {
  try {
    const response = await instance.post("lectura", data);
    return await response.data;
  } catch (error) {
    throw error;
  }
};

export const lecturaRecibo = async (
  id: string
): Promise<ResponseReciboData> => {
  try {
    const response = await instance.get(`lectura/recibo/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const lecturaMedidor = async (
  medidor: string
): Promise<LecturaMedidorI[]> => {
  try {
    const response = await instance.get(`lectura/medidor/${medidor}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listarLecturas = async (
  limite: number,
  pagina: number,
  buscadorLecturaI: BuscadorLecturaI
): Promise<ResponseDataI<ListarLecturaI>> => {
  const params: ParamsI & BuscadorLecturaI = {
    limite: limite,
    pagina: pagina,
  };
  buscadorLecturaI.numeroMedidor
    ? (params.numeroMedidor = buscadorLecturaI.numeroMedidor)
    : params;

  buscadorLecturaI.mes ? (params.mes = buscadorLecturaI.mes) : params;

  buscadorLecturaI.fechaInicio
    ? (params.fechaInicio = buscadorLecturaI.fechaInicio)
    : params;

  buscadorLecturaI.fechaFin
    ? (params.fechaFin = buscadorLecturaI.fechaFin)
    : params;
  try {
    const response = await instance.get(`lectura`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
