import { instance } from "../../config/instance"
import { DataClienteI } from "../interface/dataCliente"


export const buscarMedidor=async(codigo:string):Promise<DataClienteI>=>{
    try {
        const response = await instance.get(`medidor/buscar/${codigo}`)
        return response.data
    } catch (error) {
        throw error
    }

}