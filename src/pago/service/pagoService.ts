import { instance } from "../../config/instance";
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
