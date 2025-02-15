import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FormLecturaI } from "../interface/formLectura"
import { buscarMedidor } from "../service/lecturaService"
import { DataClienteI } from "../interface/dataCliente"

export const FormLectura = () => {
    const [cliente, setCliente] = useState<DataClienteI>()
    const { register, handleSubmit, watch } = useForm<FormLecturaI>()
    const codigoMedidor = watch("codigoMedidor")
    console.log(codigoMedidor);

    useEffect(() => {
        buscarMedidorCliente()
    }, [codigoMedidor])

    const buscarMedidorCliente = async () => {
        try {
            if (codigoMedidor) {
                const response = await buscarMedidor(codigoMedidor)
                setCliente(response)

            }
        } catch (error) {
            console.log(error);

        }
    }
    const onSubmit = async (data: FormLecturaI) => {
        try {
            if (cliente) {


            }

        } catch (error) {

        }

    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
                <div className="bg-blue-500 text-white text-center py-4 rounded-t-lg">
                    <h5 className="text-xl font-semibold">Registro de Lectura del Medidor de Agua</h5>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="mb-6 col-span-2">
                                <label htmlFor="codigoMedidor" className="block text-gray-700 font-medium">Código Medidor</label>
                                <input
                                    {...register("codigoMedidor")}
                                    type="text"
                                    id="codigoMedidor"
                                    placeholder="Ingrese el código del medidor"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </div>


                            <div className="mb-6 col-span-2">
                                {cliente && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 text-justify">
                                        <div className="p-4 bg-white rounded-lg shadow-md">
                                            <p className="font-semibold text-lg text-blue-600 mb-2">Datos del Cliente</p>
                                            <p><strong className="text-gray-800">Código Cliente:</strong> <span className="text-gray-600">{cliente.codigoCliente}</span></p>
                                            <p><strong className="text-gray-800">CI:</strong> <span className="text-gray-600">{cliente.ci}</span></p>
                                            <p><strong className="text-gray-800">Nombre Completo:</strong> <span className="text-gray-600">{cliente.nombre} {cliente.apellidoPaterno} {cliente.apellidoMaterno}</span></p>
                                            <p><strong className="text-gray-800">Dirección:</strong> <span className="text-gray-600">{cliente.direccion}</span></p>
                                        </div>
                                        <div className="p-4 bg-white rounded-lg shadow-md">
                                            <p className="font-semibold text-lg text-blue-600 mb-2">Datos del Medidor</p>
                                            <p><strong className="text-gray-800">Estado:</strong> <span className="text-gray-600">{cliente.estado}</span></p>
                                            <p><strong className="text-gray-800">Número de Serie:</strong> <span className="text-gray-600">{cliente.numeroSerie}</span></p>
                                            <p><strong className="text-gray-800">Código Medidor:</strong> <span className="text-gray-600">{cliente.codigo}</span></p>
                                        </div>
                                    </div>
                                )}
                            </div>


                            <div className="mb-6">
                                <label htmlFor="lecturaAnterior" className="block text-gray-700 font-medium">Lectura Anterior</label>
                                <input
                                    {...register("lecturaAnterior")}
                                    type="number"
                                    id="lecturaAnterior"
                                    placeholder="Ingrese la lectura anterior"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="lecturaActual" className="block text-gray-700 font-medium">Lectura Actual</label>
                                <input
                                    {...register("lecturaActual")}
                                    type="number"
                                    id="lecturaActual"
                                    placeholder="Ingrese la lectura actual"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </div>
                        </div>
                        <div className="text-center mt-6">
                            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
