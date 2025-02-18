import { HttpStatus } from "../../core/enums/httpStatus"

export interface ReciboDataI{
    _id: string,
    lecturaActual: number,
    lecturaAnterior: number,
    consumoTotal: number,
    fecha: string,
    codigoCliente: number,
    numeroMedidor: string,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    direccion: string,
    categoria: string
    costoApagar:number
}

export interface ResponseReciboData{
    status:HttpStatus,
    data:ReciboDataI
}

