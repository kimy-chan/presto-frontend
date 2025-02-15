import { instance } from "../../config/instance"

import {ClienteI} from '../interface/cliente'
import { FormClienteI } from "../interface/formCliente"

import { ResponseClienteI } from "../interface/resposeCliente"

export  const listarClientes = async():Promise<ClienteI[]>=>{
    try {
        const response = await instance.get('cliente')
        return response.data
    } catch (error) {
        throw  error
        
    }
}


export const crearCliente = async(data:FormClienteI):Promise<ResponseClienteI>=>{
    try {
          const response = await instance.post('cliente',data)
          return response.data
    } catch (error) {
        throw error
    }
}


export const buscarCliente = async(codigo:string):Promise<ClienteI>=>{
    try {
          const response = await instance.get('cliente',
            {
            params:{
                codigo:codigo
            }
            }
          )
          return response.data
    } catch (error) {
        throw error
    }
}