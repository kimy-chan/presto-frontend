import { useForm } from "react-hook-form"
import { pagoParams } from "../interface/params"

export const BuscarPago = () => {
    const { register, handleSubmit } = useForm<pagoParams>()
    return (
        <form>
            <div className="mb-4">
                <label htmlFor="ci" className="block text-sm font-medium text-gray-700">CI</label>
                <input
                    {...register("ci")}
                    type="text" id="ci" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            {/* Campo Número de Medidor */}
            <div className="mb-4">
                <label htmlFor="numeroMedidor" className="block text-sm font-medium text-gray-700">Número de medidor</label>
                <input       {...register("numeroMedidor")} type="text" id="numeroMedidor" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>


            <div className="mb-4">
                <label htmlFor="numeroLectura" className="block text-sm font-medium text-gray-700">Número de lectura</label>
                <input     {...register("codigo")} type="text" id="numeroLectura" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            <div className="mb-4 text-center">
                <button className="bg-blue-700 p-3 rounded-2xl text-white">BUSCAR</button>
            </div>

        </form>
    )
}
