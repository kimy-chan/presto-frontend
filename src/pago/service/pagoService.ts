
import { instance } from "../../config/instance"
import { pagoParams } from "../interface/params"

export const  buscarPago=async(ci:string, numeroMedidor:string, codigo:number)=>{
        const params:pagoParams={
            ci:ci,
            codigo:codigo,
            numeroMedidor:numeroMedidor
        }
        try {
            const response = await instance.get('pago/buscar',{
                params
            })
            console.log(response);
            
        } catch (error) {
            throw error
        }
}

