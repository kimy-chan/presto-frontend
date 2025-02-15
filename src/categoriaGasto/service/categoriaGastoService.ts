import { instance } from "../../config/instance"
import { response } from "../../core/interface/response"
import { CategoriaGastoI } from "../interface/categoriaGasto"
import { FormCategoriaGastoI } from "../interface/formCategoriaGasto"



export const crearCategoriaGasto= async(data:FormCategoriaGastoI):Promise<response>=>{
    try {
        const response = await instance.post('categoria/gasto',data)
        return response.data
         
    } catch (error) {
        throw error
    }

}



export const listarCategoriaGasto= async():Promise<CategoriaGastoI[]>=>{
    try {
        const response = await instance.get('categoria/gasto')
        return response.data
         
    } catch (error) {
        throw error
    }

}