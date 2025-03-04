import { useForm } from "react-hook-form";
import { HttpStatus } from "../../core/enums/httpStatus";
import { FormLecturaI } from "../interface/formLectura";
import { AxiosError } from "axios";
import { ErrorConflictoI } from "../../core/interface/errorConflicto";
import { ErrorI } from "../../core/interface/error";
import { useEffect, useState } from "react";
import { editarLectura, lecturaId } from "../service/lecturaService";

export const EditarLecturaModal = ({ closeModal, isOpen, lectura }: { lectura: string, closeModal: () => void, isOpen: boolean }) => {
    const [error, setError] = useState<string>()

    const [conflicto, setConflicto] = useState<string>()



    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormLecturaI>()

    const lecturaAnterior = watch("lecturaAnterior")
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    useEffect(() => {
        if (isOpen) {
            lecturaPorid()
        }
    }, [isOpen])

    const lecturaPorid = async () => {
        try {
            const response = await lecturaId(lectura)
            if (response.status == HttpStatus.OK) {
                console.log(response.data.mes.charAt(0));

                setValue("lecturaAnterior", response.data.lecturaAnterior)
                setValue("mes", response.data.mes.charAt(0).toUpperCase() + response.data.mes.slice(1).toLowerCase())
                setValue("lecturaActual", response.data.lecturaActual)
            }
        } catch (error) {
            console.log(error);

        }
    }

    const onSubmit = async (data: FormLecturaI) => {
        try {

            const response = await editarLectura(lectura, data)
            if (response.status == HttpStatus.OK) {

            }



        } catch (error) {
            console.log(error);

            const e = error as AxiosError

            if (e.status == HttpStatus.CONFLICT) {
                const conflictoError = e.response?.data as ErrorConflictoI
                setConflicto(conflictoError.message)
            }
            if (e.status == HttpStatus.BAD_REQUEST) {
                const err = e.response?.data as ErrorI
                setError(err.message)
            }



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
                            <h2 className="text-xl font-semibold">Editar lectura</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-4">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">




                                    <div className="mb-6 col-span-2">
                                        <label htmlFor="mes" className="block text-gray-700 font-medium mb-2">Mes</label>
                                        <select
                                            {...register("mes", { required: 'Seleccione un mes' })}

                                            name="mes"
                                            id="mes"
                                            className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            {meses.map((item, index) => (
                                                <option key={index} value={item} className="text-gray-700">{item}</option>
                                            ))}
                                        </select>
                                        {errors.mes && <p className='text-xs text-red-500'>{errors.mes.message}</p>}
                                    </div>

                                    <div className="mb-6 col-span-2">
                                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="lecturaAnterior" className="block text-gray-700 font-medium"> Lectura Anterior m³</label>
                                                <input
                                                    disabled
                                                    {...register("lecturaAnterior", {
                                                        valueAsNumber: true,
                                                        validate: (value: number) => {
                                                            if (!value || value <= 0) {
                                                                return "Ingrese la lectura anterior"
                                                            }

                                                            return true
                                                        }
                                                    })}
                                                    type="number"
                                                    id="lecturaAnterior"
                                                    placeholder="Ingrese la lectura anterior"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                                />
                                                {errors.lecturaAnterior && <p className='text-xs text-red-500'>{errors.lecturaAnterior.message}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="lecturaActual" className="block text-gray-700 font-medium">Lectura Actual m³</label>
                                                <input
                                                    {...register("lecturaActual", {
                                                        valueAsNumber: true,
                                                        validate: (value: number) => {
                                                            if (!value || value <= 0) {
                                                                return "Ingrese la lectura actual"
                                                            }
                                                            if (value < lecturaAnterior) {
                                                                return "Ingrese las lecturas correctas"
                                                            }
                                                            return true
                                                        }
                                                    })}
                                                    type="number"
                                                    id="lecturaActual"
                                                    placeholder="Ingrese la lectura actual"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                                />
                                                {errors.lecturaActual && <p className='text-xs text-red-500'>{errors.lecturaActual.message}</p>}
                                            </div>
                                        </div>
                                        {conflicto && <p className='text-xs text-red-500'>{conflicto}</p>}
                                        {error && <p className='text-xs text-red-500'>{error}</p>}
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
            )}
        </div>
    );
};

