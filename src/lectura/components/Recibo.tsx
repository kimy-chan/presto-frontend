import { useEffect, useState } from "react";
import { lecturaRecibo } from "../service/lecturaService";
import { ReciboDataI } from "../interface/reciboData";
import { HttpStatus } from "../../core/enums/httpStatus";

export const Recibo = ({ id }: { id: string }) => {
    const [dataRecibo, setDataRecibo] = useState<ReciboDataI>()
    const handlePrint = () => {
        /*   const originalContent = document.body.innerHTML;
           document.body.innerHTML = printContent;
           window.print();
           document.body.innerHTML = originalContent;
           window.location.reload();*/
    };
    useEffect(() => {
        recibo()

    }, [])

    const recibo = async () => {
        try {
            if (id) {
                const response = await lecturaRecibo(id)
                if (response.status == HttpStatus.OK) {
                    setDataRecibo(response.data)
                }


            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <>{dataRecibo && <div className="max-w-md mx-auto p-6">
            <div id="recibo" className="bg-white shadow-xl rounded-xl p-6 border border-gray-300">
                <h2 className="text-xl font-bold text-center text-blue-700">A.A.S.P.S.A.S</h2>
                <p className="text-xs text-center text-gray-600">Empresa Local de Agua Potable Presto</p>
                <div className="mt-4 border-t border-gray-400 pt-2">
                    <p className="text-sm text-gray-700"><span className="font-semibold">Código Cliente:</span> {dataRecibo.codigoCliente}</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Nro Medidor:</span> {dataRecibo.numeroMedidor}</p>
                </div>

                <div className="mt-4 border-t border-gray-400 pt-2">
                    <p className="text-sm text-gray-700"><span className="font-semibold">Nombre:</span> {dataRecibo.nombre} {dataRecibo.apellidoPaterno}  {dataRecibo.apellidoMaterno}</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Dirección:</span> {dataRecibo.direccion}</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Categoría:</span> {dataRecibo.categoria}</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Fecha y Hora:</span> {dataRecibo.fecha}</p>
                </div>

                <div className="mt-4 border-t border-gray-400 pt-2 grid grid-cols-2 gap-4">
                    <p className="text-sm text-gray-700"><span className="font-semibold">Lectura Actual:</span> {dataRecibo.lecturaActual}</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Lectura Anterior:</span> {dataRecibo.lecturaAnterior}</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Consumo:</span> {dataRecibo.consumoTotal} m³</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Fecha Vencimiento:</span> 06/03/2025</p>
                </div>

                <div className="mt-4 border-t border-gray-400 pt-4 text-center bg-gray-100 rounded-lg p-4 shadow-md">
                    <p className="text-lg font-bold text-gray-800">Total Importe del Mes</p>
                    <p className="text-2xl font-bold text-green-600">Bs. {dataRecibo.costoApagar}</p>
                </div>
            </div>

            <div className="mt-4 text-center">
                <button onClick={handlePrint} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Imprimir Recibo</button>
            </div>
        </div>}</>
    );
};
