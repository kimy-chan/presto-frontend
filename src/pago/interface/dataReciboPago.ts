import { HttpStatus } from "../../core/enums/httpStatus";

export interface dataReciboPago {
  cliente: {
    apellidoMaterno: string;
    apellidoPaterno: string;
    ci: string;
    direccion: string;
    nombre: string;
    numeroMedidor: string;
    _id: string;
  };
  pagos: [
    {
      costoPagado: number;
      lecturaActual: number;
      lecturaAnteriror: number;
      mesa: string;
      observaciones: string;
      _id: string;
    }
  ];
  status: HttpStatus;
}
