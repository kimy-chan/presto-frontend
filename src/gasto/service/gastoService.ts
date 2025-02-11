import { instance } from "../../config/instance";
import { response } from "../../core/interface/response";
import { FormGastoI } from "../interface/formGasto";
import { GastoI } from "../interface/gasto";


export const crearGasto= async(data:FormGastoI):Promise<response>=>{
    try {
        const response = await instance.post('gasto', data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const listarGastos= async():Promise<GastoI[]>=>{
    try {
        const response = await instance.get('gasto')
        return response.data
    } catch (error) {
        throw error
    }
}