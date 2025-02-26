import { instance } from "../../config/instance";
import { ParamsI } from "../../core/interface/params";
import { BuscadorPagosI } from "../interface/buscadorPagos";
import { dataReciboPago } from "../interface/dataReciboPago";
import { ListarPagosI } from "../interface/listarPagos";
import { RealizaPago } from "../interface/realizarPago";
import { ResponsePagoRealizadoI } from "../interface/responsePagoRealizado";

export const realizarPagos = async (
  data: RealizaPago
): Promise<ResponsePagoRealizadoI> => {
  try {
    const response = await instance.post("pago/realizar", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listarPagosCliente = async (
  medidor: string
): Promise<dataReciboPago> => {
  try {
    const response = await instance.get(`pago/cliente/${medidor}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listarTodosLosPagos = async (
  buscador: BuscadorPagosI,
  limite: number,
  pagina: number
): Promise<ListarPagosI[]> => {
  const params: ParamsI & BuscadorPagosI = {
    limite: limite,
    pagina: pagina,
  };
  buscador.ci ? (params.ci = buscador.ci) : params;
  buscador.nombre ? (params.nombre = buscador.nombre) : params;
  buscador.apellidoPaterno
    ? (params.apellidoPaterno = buscador.apellidoPaterno)
    : params;
  buscador.apellidoMaterno
    ? (params.apellidoMaterno = buscador.apellidoMaterno)
    : params;

  buscador.numeroMedidor
    ? (params.numeroMedidor = buscador.numeroMedidor)
    : params;

  buscador.fechaInicio ? (params.fechaInicio = buscador.fechaInicio) : params;
  buscador.fechaFin ? (params.fechaFin = buscador.fechaFin) : params;
  try {
    const response = await instance.get("pago/listar", {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
