import { useEffect, useState } from "react"
import { listarCategoriaGasto } from "../service/categoriaGastoService"
import { CategoriaGastoI } from "../interface/categoriaGasto"

export const TablaCategoriaGasto = () => {
    const [categoriaGastos, setCategoriaGastos] = useState<CategoriaGastoI[]>([])
    useEffect((

    ) => { categoriaGasto() }, [])

    const categoriaGasto = async () => {
        try {
            const response = await listarCategoriaGasto()
            setCategoriaGastos(response)
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 border">Nombre</th>
                        <th className="px-4 py-2 border">Fecha</th>
                        <th className="px-4 py-2 border">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {categoriaGastos.map((item) => (
                        <tr className="hover:bg-gray-100">
                            <td className="px-4 py-2 border">{item.nombre}</td>
                            <td className="px-4 py-2 border">{item.fecha}</td>
                            <td className="px-4 py-2 border"></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
