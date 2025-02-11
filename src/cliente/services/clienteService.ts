import { instance } from "../../config/instance"

import {ClienteI} from '../interface/cliente'
import { FormClienteI } from "../interface/formCliente"
import { response } from "../../core/interface/response"

export  const listarClientes = async():Promise<ClienteI[]>=>{
    try {
        const response = await instance.get('cliente')
        return response.data
    } catch (error) {
        throw  error
        
    }
}


export const crearCliente = async(data:FormClienteI):Promise<response>=>{
    try {
          const response = await instance.post('cliente',data)
          return response.data
    } catch (error) {
        throw error
    }
}