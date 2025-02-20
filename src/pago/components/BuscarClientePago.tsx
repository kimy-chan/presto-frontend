
import { ClientesModal } from "../../cliente/modal/ClientesModal"
import { useEffect, useState } from "react"
import { ClienteI } from "../../cliente/interface/cliente"
import { medidorCliente } from "../../medidor/service/MedidorService"
import { DataMedidorClienteI } from "../../medidor/interface/dataMedidorCliente"
import { lecturaMedidor } from "../../lectura/service/lecturaService"
import { LecturaMedidorI } from "../../lectura/interface/lecturaMedidor"
import { ClienteMedidorLecturaI } from "../interface/clienteMedidorLectura"


export const BuscadorClientePago = ({ setData }: { setData: (data: ClienteMedidorLecturaI) => void }) => {
    const [cliente, setCliente] = useState<ClienteI>()
    const [medidores, setMedidores] = useState<DataMedidorClienteI[]>([])
    const [lecturas, setLecturas] = useState<LecturaMedidorI[]>([])
    const [medidor, setMedidor] = useState<string>()
    const [lectura, setLectura] = useState<string>()
    useEffect(() => {
        medidoresCliente()
    }, [cliente])

    useEffect(() => {
        lecturasClienteMedidor()
    }, [medidor])

    useEffect(() => {
        if (cliente) {
            const medidorSeleccionado = medidores.filter((item) => item._id === medidor)[0]
            const lecturaSeleccionada = lecturas.filter((item) => item._id === lectura)[0]


            const data: ClienteMedidorLecturaI = {
                ci: cliente.ci,
                apellidoMaterno: cliente.apellidoMaterno,
                apellidoPaterno: cliente.apellidoPaterno,
                codigo: cliente.codigo,
                celular: cliente.celular,
                nombre: cliente.celular,
                idCliente: cliente._id,
                estado: medidorSeleccionado.estado,
                numeroMedidor: medidorSeleccionado.numeroMedidor,
                tarifa: medidorSeleccionado.tarifa,
                consumoTotal: lecturaSeleccionada.consumoTotal,
                costoApagar: lecturaSeleccionada.costoApagar,
                codigolectura: lecturaSeleccionada.codigo,
                lecturaActual: lecturaSeleccionada.lecturaActual,
                lecturaAnterior: lecturaSeleccionada.lecturaAnterior,
                medidor: lecturaSeleccionada.medidor,
                mes: lecturaSeleccionada.mes,
                numeroLectura: lecturaSeleccionada.numeroLectura,
                idLectura: lecturaSeleccionada._id,
                idMedidor: medidorSeleccionado._id

            }



            setData(data)
        }

    }, [lectura])

    const medidoresCliente = async () => {
        try {
            if (cliente) {
                const response = await medidorCliente(cliente._id)
                setMedidores(response)
            }
        } catch (error) {

        }
    }

    const lecturasClienteMedidor = async () => {
        try {
            if (medidor) {
                const response = await lecturaMedidor(medidor)
                setLecturas(response)
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Buscar Cliente */}
                <div>
                    <label htmlFor="cliente" className="block text-sm font-medium text-gray-700">
                        Buscar cliente
                    </label>
                    <ClientesModal setCliente={setCliente} />
                </div>

                {/* Número de Medidor */}
                <div>
                    <label htmlFor="numeroMedidor" className="block text-sm font-medium text-gray-700">
                        Número de Medidor
                    </label>
                    <div className="relative mt-1">
                        <select
                            id="numeroMedidor"
                            onChange={(e) => setMedidor(e.target.value)}
                            className="block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 py-2 px-3 pr-10 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200 transition-colors"
                        >
                            <option value="">Selecciona un número de medidor</option>
                            {medidores.map((item, index) => (
                                <option key={index} value={item._id}>
                                    N° {item.numeroMedidor}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Seleccionar Mes */}
                <div>
                    <label htmlFor="mesPago" className="block text-sm font-medium text-gray-700">
                        Seleccione su mes
                    </label>
                    <div className="relative mt-1">
                        <select
                            onChange={(e) => setLectura(e.target.value)}
                            id="mesPago"
                            className="block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 py-2 px-3 pr-10 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200 transition-colors"
                        >
                            <option value="">Selecciona un mes de pago</option>
                            {lecturas.map((item, index) => (
                                <option key={index} value={item._id}>
                                    {item.mes} - Estado: {item.estado}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
