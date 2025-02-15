import { instance } from "../../config/instance";
import { response } from "../../core/interface/response";
import { FormMedidorI } from "../interface/formMedidor";

export const crearMedidor = async(data:FormMedidorI):Promise<response>=>{
    try {
        const response = await instance.post('medidor', data)
        return response.data
    } catch (error) {
        throw error
    }

}