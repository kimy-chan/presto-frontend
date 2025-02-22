import { useEffect, useState } from "react";
import { listarPagosCliente } from "../service/pagoService";
import { HttpStatus } from "../../core/enums/httpStatus";
import { dataReciboPago } from "../interface/dataReciboPago";
import { IoIosPrint } from "react-icons/io";

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export const ReciboPagoCliente = ({ medidor }: { medidor: string }) => {
    const [dataCliente, setDataCliente] = useState<dataReciboPago>();

    useEffect(() => {
        pagos();
    }, []);

    const pagos = async () => {
        try {
            if (medidor) {
                const response = await listarPagosCliente(medidor);
                if (response.status === HttpStatus.OK) {
                    setDataCliente(response);
                }
            }
        } catch (error) {
            console.error("Error al listar pagos:", error);
        }
    };



    return (
        <>
            {dataCliente && (
                <div id="recibo" className="w-[210mm] h-[230mm] p-10 bg-white text-black mx-auto">
                    <h2 className="text-center font-bold text-lg">
                        ASOCIACIÓN DE AGUA POTABLE Y SANEAMIENTO
                    </h2>
                    <h3 className="text-center font-bold text-md">"APÓSTOL SANTIAGO DE PRESTO"</h3>
                    <h4 className="text-center font-bold text-sm">"AASPAS - PRESTO"</h4>

                    <div className="mt-5 flex justify-between">
                        <div>
                            <p>
                                <strong>Número y Apellidos:</strong> {dataCliente.cliente.nombre}{" "}
                                {dataCliente.cliente.apellidoPaterno} {dataCliente.cliente.apellidoMaterno}
                            </p>
                            <p>
                                <strong>Dirección:</strong> {dataCliente.cliente.direccion}{" "}
                            </p>
                        </div>
                        <div>
                            <p>
                                <strong>No. de Medidor:</strong> {dataCliente.cliente.numeroMedidor}{" "}
                            </p>
                            <p>
                                <strong>No. de Socio:</strong> {dataCliente.cliente.ci}
                            </p>
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
                            {meses.map((mes, index) => {
                                const pago = dataCliente.pagos.find(
                                    (item) => item.mes.toLowerCase() === mes.toLowerCase()
                                );

                                return (
                                    <tr key={index} className="border border-black">
                                        <td className="border border-black p-1">{mes}</td>
                                        <td className="border border-black p-1">{pago?.gestion}</td>
                                        <td className="border border-black p-1">{pago?.lecturaAnterior}</td>
                                        <td className="border border-black p-1">{pago?.lecturaActual}</td>
                                        <td className="border border-black p-1">{pago?.consumoTotal}</td>
                                        <td className="border border-black p-1">{pago?.costoPagado}</td>
                                        <td className="border border-black p-1">{pago?.observaciones}</td>
                                    </tr>
                                );
                            })}
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
            )}

            <div className="text-center mt-5">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded text-3xl hover:bg-blue-700"
                    onClick={imprimir}
                >
                    <IoIosPrint />
                </button>
            </div>
        </>

    );
};



const imprimir = () => {
    const content = document.getElementById("recibo"); // Obtener el div del recibo
    if (content) {
        const printWindow = window.open("", "", "width=800,height=900");


        const styles = [...document.styleSheets]
            .map((styleSheet) => {
                try {
                    return [...styleSheet.cssRules].map((rule) => rule.cssText).join("");
                } catch (e) {
                    return "";
                }
            })
            .join("");

        printWindow?.document.write(`
            <html>
                <head>
                    <style>${styles}</style>
                </head>
                <body class="bg-white text-black p-10">
                    ${content.outerHTML}
                </body>
            </html>
        `);

        printWindow?.document.close();
        printWindow?.focus();
        printWindow?.print();
        printWindow?.close();
    }
};

