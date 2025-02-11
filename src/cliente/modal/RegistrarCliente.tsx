import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormClienteI } from "../interface/formCliente";
import { crearCliente } from "../services/clienteService";

export const RegistarClienteModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const { register, handleSubmit } = useForm<FormClienteI>()
    const onSubmit = async (data: FormClienteI) => {
        try {
            const response = await crearCliente(data)
            console.log(response);

        } catch (error) {
            console.log(error);

        }

    }
    return (
        <div className="p-4">

            <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={openModal}
            >
                Registrar Cliente
            </button>


            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={closeModal}
                    ></div>


                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-md">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Cliente</h2>

                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-4">
                            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                                {/* CI */}
                                <div>
                                    <label className="block text-gray-600 text-sm font-medium mb-1">CI</label>
                                    <input
                                        {...register("ci")}
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Ingrese su CI"
                                    />
                                </div>

                                {/* Nombre */}
                                <div>
                                    <label className="block text-gray-600 text-sm font-medium mb-1">Nombre</label>
                                    <input
                                        {...register("nombre")}
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Ingrese su nombre"
                                    />
                                </div>

                                {/* Apellido Paterno y Apellido Materno */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-600 text-sm font-medium mb-1">Apellido Paterno</label>
                                        <input
                                            {...register("apellidoPaterno")}
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Apellido Paterno"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-600 text-sm font-medium mb-1">Apellido Materno</label>
                                        <input
                                            {...register("apellidoPaterno")}
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Apellido Materno"
                                        />
                                    </div>
                                </div>

                                {/* Dirección */}
                                <div>
                                    <label className="block text-gray-600 text-sm font-medium mb-1">Dirección</label>
                                    <input
                                        {...register("direccion")}
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Ingrese su dirección"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-600 text-sm font-medium mb-1">Celular</label>
                                    <input
                                        {...register("celular")}
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Ingrese su dirección"
                                    />
                                </div>

                                {/* Botón de Enviar */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
                                >
                                    Registrar Cliente
                                </button>
                            </form>

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};