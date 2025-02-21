import { useEffect, useState } from "react";
import { listarPagosCliente } from "../service/pagoService";
import { HttpStatus } from "../../core/enums/httpStatus";
import { dataReciboPago } from "../interface/dataReciboPago";
import { ClienteI } from "../../cliente/interface/cliente";

export const ReciboPagoCliente = ({ medidor }: { medidor: string }) => {
    const [dataCliente, setDataCliente] = useState<dataReciboPago>()
    useEffect(() => {
        pagos()
    }, [])

    const pagos = async () => {
        try {
            if (medidor) {
                const response = await listarPagosCliente(medidor)
                if (response.status == HttpStatus.OK) {
                    setDataCliente(response)
                }

            }
        } catch (error) {

        }

    }
    return (
        <>{dataCliente &&
            <div className="w-[210mm] h-[230mm] p-10 border border-gray-300 bg-white text-black mx-auto">
                <h2 className="text-center font-bold text-lg">ASOCIACIÓN DE AGUA POTABLE Y SANEAMIENTO</h2>
                <h3 className="text-center font-bold text-md">"APÓSTOL SANTIAGO DE PRESTO"</h3>
                <h4 className="text-center font-bold text-sm">"AASPAS - PRESTO"</h4>

                <div className="mt-5 flex justify-between">
                    <div>
                        <p><strong>Número y Apellidos:</strong> {dataCliente.cliente.nombre} {dataCliente.cliente.apellidoPaterno}  {dataCliente.cliente.apellidoMaterno} </p>
                        <p><strong>Dirección:</strong> {dataCliente.cliente.direccion} </p>
                    </div>
                    <div>
                        <p><strong>No. de Medidor:</strong> {dataCliente.cliente.numeroMedidor} </p>
                        <p><strong>No. de Socio:</strong> {dataCliente.cliente.ci}</p>
                    </div>
                </div>

                <h3 className="text-center font-bold text-md mt-5">RECIBO DE PAGO</h3>

                <table className="w-full mt-5 border border-black">
                    <thead>
                        <tr className="border border-black">
                            <th className="border border-black p-1">Meses</th>
                            <th className="border border-black p-1">Año</th>
                            <th className="border border-black p-1">Lectura Anterior</th>
                            <th className="border border-black p-1">Lectura Actual</th>
                            <th className="border border-black p-1">Consumo Total m³</th>
                            <th className="border border-black p-1">Total Pagado</th>
                            <th className="border border-black p-1">Observaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"].map((mes, index) => (
                            <tr key={index} className="border border-black">
                                <td className="border border-black p-1">{mes}</td>
                                <td className="border border-black p-1">______</td>
                                <td className="border border-black p-1">______</td>
                                <td className="border border-black p-1">______</td>
                                <td className="border border-black p-1">______</td>
                                <td className="border border-black p-1">______</td>
                                <td className="border border-black p-1">______</td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                <div className="mt-10 flex justify-between">
                    <div>
                        <p>_________________________</p>
                        <p className="text-sm">Razón Conforme</p>
                        <p className="text-sm">Secretario de Hacienda</p>
                        <p className="text-sm">ASOCIACIÓN</p>
                    </div>
                    <div>
                        <p>_________________________</p>
                        <p className="text-sm">Entrega Conforme</p>
                        <p className="text-sm">SOCIO (FIRMA)</p>
                    </div>
                </div>
            </div>
        }</>

    );
};

