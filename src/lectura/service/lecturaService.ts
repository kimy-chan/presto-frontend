import { instance } from "../../config/instance"
import { response } from "../../core/interface/response"
import { FormLecturaI } from "../interface/formLectura"

export const crearLectura = async(data:FormLecturaI):Promise<response>=>{
    try {
        const response =  await instance.post('lectura', data)
        return await response.data
    } catch (error) {
         throw error
    }
}