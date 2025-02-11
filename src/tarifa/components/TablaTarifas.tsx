import { useEffect, useState } from 'react'
import { listarRangoTarifa, listarTarifas } from '../service/tarifasService'
import { TarifaI } from '../interface/tarifa'
import { MdDelete } from 'react-icons/md'
import { IoMdInformationCircle } from 'react-icons/io'
import { FaRegEdit } from 'react-icons/fa'
import { Rango } from '../modal/Rango'
import { RangoI } from '../interface/rango'


export const TablaTarifas = () => {
    const [abriModalRango, setModalRango] = useState(false)
    const [tarifas, setTarifas] = useState<TarifaI[]>([])
    const [rangos, setRangos] = useState<RangoI[]>([])

    useEffect(() => {
        listar()
    }, [])

    const listar = async () => {

        try {
            const response = await listarTarifas()
            setTarifas(response)
        } catch (error) {

        }
    }
    const cerrarModalRango = () => {
        setModalRango(false)
    }

    const verRangoTarifa = async (tarifa: string) => {
        setModalRango(true)
        try {
            const response = await listarRangoTarifa(tarifa)
            setRangos(response)

        } catch (error) {
            console.log(error);

        }



    }
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre Tarifa
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acción
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tarifas.map((item, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.nombre}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button className='text-2xl'>
                                    <MdDelete />
                                </button>
                                <button onClick={() => verRangoTarifa(item._id)} className='text-2xl' >
                                    <IoMdInformationCircle />
                                </button>

                                <button className='text-2xl' >
                                    <FaRegEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {abriModalRango && <Rango isOpen={abriModalRango} closeModal={cerrarModalRango} data={rangos} />}
        </div>
    )
}
