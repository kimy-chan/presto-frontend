import axios from "axios";
import { instance } from "../../config/instance";
import { response } from "../../core/interface/response";
import { DataI } from "../interface/data";
import { TarifaI } from "../interface/tarifa";
import { RangoI } from "../interface/rango";


export const crearTarifa = async(data:DataI):Promise<response>=>{
    try {   
        console.log(data);
        
        const response = await instance.post('tarifa', data)
    return response.data
    } catch (error) {
        console.log(error);
        
        throw error
    }
}

export const listarTarifas = async():Promise<TarifaI[]>=>{
    try {   
        const response = await instance.get('tarifa')
    return response.data
    } catch (error) {
        console.log(error);
        
        throw error
    }
}

export const listarRangoTarifa = async(tarifa:string):Promise<RangoI[]>=>{
    try {   
    
        const response = await instance.get(`rango/${tarifa}`)
    return response.data
    } catch (error) {
 
        throw error
    }
}

