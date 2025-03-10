import { useForm } from "react-hook-form";
import { BuscadorGastoI } from "../interface/BuscadorGasto";
import { useEffect, useState } from "react";
import { listarCategoriaGastoPublico } from "../../categoriaGasto/service/categoriaGastoService";
import { CategoriaGastoI } from "../../categoriaGasto/interface/categoriaGasto";



export const BuscadorGasto = ({ onSubmit }: { onSubmit: (data: BuscadorGastoI) => void }) => {
    const [categorias, setCategorias] = useState<CategoriaGastoI[]>([])
    useEffect(() => {
        categoria()
    }, [])

    const categoria = async () => {
        try {
            const response = await listarCategoriaGastoPublico()
            setCategorias(response)
        } catch (error) {

        }
    }
    const { handleSubmit, register } = useForm<BuscadorGastoI>();
    return (
        <div className="p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-8 gap-4 items-center">

                <div className="flex flex-col">
                    <select
                        {...register("categoriaGasto")}
                        name="categoriaGasto"
                        className="p-2 border border-gray-300 rounded mt-6">
                        <option value=''>Seleccion la categoria de gasto</option>
                        {categorias.map((item, i) => (
                            <option value={item._id} key={i}>
                                {item.nombre}
                            </option>
                        ))}
                    </select>
                </div>




                <div className="flex flex-col">
                    <label className="text-sm font-medium">Fecha Inicio</label>
                    <input {...register("fechaInicio")} type="date" name="fechaInicio" className="p-2 border border-gray-300 rounded mt-1" />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">Fecha Fin</label>
                    <input {...register("fechaFin")} type="date" name="fechaFin" className="p-2 border border-gray-300 rounded mt-1" />
                </div>

                <div className="flex flex-col">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Buscar
                    </button>
                </div>
            </form>
        </div>
    );
};
