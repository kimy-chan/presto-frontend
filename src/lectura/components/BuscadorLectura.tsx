import { useForm } from "react-hook-form";
import { BuscadorLecturaI } from "../interface/buscadorLectura";
import { useEffect } from "react";


export const BuscadorLectura = ({ onSubmit }: { onSubmit: (data: BuscadorLecturaI) => void }) => {
    const { register, handleSubmit, setValue } = useForm<BuscadorLecturaI>();
    useEffect(() => {
        const date = new Date()
        const fecha = date.toISOString().split('T')[0]
        setValue("fechaFin", fecha)
        setValue("fechaInicio", fecha)

    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Campo: Número de Medidor */}
                <div>
                    <label htmlFor="numeroMedidor" className="block text-gray-700 font-semibold mb-2">Número de Medidor</label>
                    <input {...register("numeroMedidor")} id="numeroMedidor"
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                {/* Campo: Mes */}
                <div>
                    <label htmlFor="estado" className="block text-gray-700 font-semibold mb-2">Estado</label>
                    <select
                        {...register("estado")}
                        id="estado"
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Seleccione el estado</option>
                        <option value='PENDIENTE'>Pendiente</option>
                        <option value='PAGADO'>Pagado</option>
                    </select>
                </div>

                {/* Campo: Fecha de Inicio */}
                <div>
                    <label htmlFor="fechaInicio" className="block text-gray-700 font-semibold mb-2">Fecha de Inicio</label>
                    <input
                        type="date"
                        {...register("fechaInicio")}
                        id="fechaInicio"
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Campo: Fecha de Fin */}
                <div>
                    <label htmlFor="fechaFin" className="block text-gray-700 font-semibold mb-2">Fecha de Fin</label>
                    <input

                        type="date"
                        {...register("fechaFin")}
                        id="fechaFin"
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div >
                    <button type="submit" className="mt-6 bg-blue-500 text-white p-2 sm:p-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Buscar
                    </button>
                </div>
            </div>
        </form>
    );
};
