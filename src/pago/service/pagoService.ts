import { instance } from "../../config/instance";
import { dataReciboPago } from "../interface/dataReciboPago";
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
