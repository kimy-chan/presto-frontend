import { instance } from "../../config/instance"

import { FormLecturaI } from "../interface/formLectura"
import { ResponseReciboData } from "../interface/reciboData"

import { ResponseLecturaI } from "../interface/responseLectura"

export const crearLectura = async(data:FormLecturaI):Promise<ResponseLecturaI>=>{
    try {
        const response =  await instance.post('lectura', data)
        return await response.data
    } catch (error) {
         throw error
    }
}

export const lecturaRecibo = async(id:string):Promise<ResponseReciboData>=>{
    try {
        const response = await instance.get(`lectura/recibo/${id}`)
        return response.data
    } catch (error) {
        throw error
    }

}