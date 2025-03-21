import { useEffect, useState } from "react";
import { listarPagosCliente } from "../service/pagoService";
import { HttpStatus } from "../../core/enums/httpStatus";
import { dataReciboPago } from "../interface/dataReciboPago";
import { IoIosPrint } from "react-icons/io";
import { Loader } from "../../core/components/Loader";

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export const ReciboPagoCliente = ({ medidor }: { medidor: string }) => {
    const [dataCliente, setDataCliente] = useState<dataReciboPago>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        pagos();
    }, []);

    const pagos = async () => {
        try {
            if (medidor) {
                setLoading(true)
                const response = await listarPagosCliente(medidor);
                if (response.status === HttpStatus.OK) {
                    setLoading(false)
                    setDataCliente(response);
                }
            }
        } catch (error) {
            setLoading(false)
            console.error("Error al listar pagos:", error);
        }
    };



    return (
        <>
            {dataCliente && (
                <div id="recibo" className="w-[210mm] h-[230mm] p-2 bg-white text-black mx-auto">
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
                                <th className="border border-black p-1">Mes</th>
                                <th className="border border-black p-1">Año</th>

                                <th className="border border-black p-1" colSpan={2}>
                                    Lectura
                                    <table className="w-full">
                                        <tr>
                                            <th >Ant</th>
                                            <th >Act</th>
                                        </tr>
                                    </table>
                                </th>



                                <th className="border border-black p-1">m³</th>
                                <th className="border border-black p-1">Total</th>
                                <th className="border border-black p-1">Fecha</th>
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
                                        <td className="border border-black p-1">{pago?.fecha}</td>
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

            {loading && <Loader />}
        </>

    );
};



const imprimir = () => {
    const content = document.getElementById("recibo");
    if (content) {
        const printWindow = window.open("width=800,height=900");

        const styles = [...document.styleSheets]
            .map((styleSheet) => {
                try {
                    return [...styleSheet.cssRules].map((rule) => rule.cssText).join("");
                } catch (e) {
                    return "";
                }
            })
            .join("");

        if (printWindow) {
            printWindow.document.write(`
            <html>
                <head>
                    <style>${styles}</style>
                </head>
                <body class="bg-white text-black p-10">
                    ${content.outerHTML}
                </body>
            </html>
        `);

            printWindow.document.close();
            printWindow.onload = () => {
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            };
        }

    }
};
