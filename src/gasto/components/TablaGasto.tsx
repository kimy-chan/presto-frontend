import { useEffect, useState } from 'react'
import { listarGastos } from '../service/gastoService'
import { GastoI } from '../interface/gasto'
import { separadorMiles } from '../../core/constants/separadorMiles'

export const TablaGasto = () => {
    const [gastos, setGasto] = useState<GastoI[]>([])
    useEffect(() => {
        listar()
    }, [])
    const listar = async () => {
        try {
            const response = await listarGastos()
            console.log(response);

            setGasto(response)
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className="p-4 w-full">
            <h1 className="text-2xl font-bold mb-4 text-gray-700 text-center text-2xl">Lista de Gastos</h1>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="px-4 py-2 border">Descripción</th>
                            <th className="px-4 py-2 border">Unidad de Manejo</th>
                            <th className="px-4 py-2 border">Cantidad</th>
                            <th className="px-4 py-2 border">Costo Unitario</th>
                            <th className="px-4 py-2 border">Factor Validez P/Año</th>
                            <th className="px-4 py-2 border">Costo por Año</th>
                            <th className="px-4 py-2 border">fecha</th>
                            <th className="px-4 py-2 border">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gastos.map((item, index) => (
                            <tr key={index} className="text-gray-700 even:bg-gray-50 hover:bg-gray-200 transition">
                                <td className="px-4 py-2 border">{item.descripcion}</td>
                                <td className="px-4 py-2 border">{item.unidadManejo}</td>
                                <td className="px-4 py-2 border text-center">{item.cantidad}</td>
                                <td className="px-4 py-2 border text-center">{item.costoUnitario.toLocaleString(separadorMiles)} Bs</td>
                                <td className="px-4 py-2 border text-center">{item.factorValides}</td>
                                <td className="px-4 py-2 border text-center">{item.costoAqo.toLocaleString(separadorMiles)} Bs</td>
                                <td className="px-4 py-2 border text-center">{item.fecha} </td>
                                <td className="px-4 py-2 border text-center">
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

