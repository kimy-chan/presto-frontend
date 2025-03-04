import { useEffect } from "react";
import { tarifaPorId } from "../service/tarifasService";
import { HttpStatus } from "../../core/enums/httpStatus";
import { useForm } from "react-hook-form";

export const EditarTarifa = ({ tarifa, closeModal, isOpen }: { tarifa: string, closeModal: () => void, isOpen: boolean }) => {
    useEffect(() => {
        if (isOpen) {
            tarifaId()
        }
    }, [isOpen])
    const { handleSubmit, register, formState: { errors }, setValue } = useForm<{ nombre: string }>()

    const tarifaId = async () => {
        try {
            const response = await tarifaPorId(tarifa)
            console.log(response);

            if (response.status == HttpStatus.OK) {

                setValue("nombre", response.data.nombre)

            }
        } catch (error) {

            console.log(error);

        }
    }


    return (
        <div className="p-4">




            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={closeModal}
                    ></div>


                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-md">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Editar tarifa</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-4">
                            <form>
                                <div className="col-span-2 sm:col-span-2">
                                    <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">
                                        Nombre
                                    </label>
                                    <input
                                        {...register("nombre", {
                                            validate: (value: string) => {
                                                if (!value) {
                                                    return "Ingrese el nombre de la tarifa"
                                                }
                                                return true

                                            }
                                        })}

                                        type="text"
                                        {...register("nombre")}
                                        id="nombre"
                                        name="nombre"
                                        placeholder="Ingresa tu nombre"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                    {errors.nombre && <p className='text-xs text-red-500'>{errors.nombre.message}</p>}
                                </div>
                            </form>
                            <div className="mt-6 flex justify-end">
                                <button
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition-colors"
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

