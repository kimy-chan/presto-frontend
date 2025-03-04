import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { HttpStatus } from "../../core/enums/httpStatus";

import { AxiosError } from "axios";
import { ErrorConflictoI } from "../../core/interface/errorConflicto";
import { FormMedidorI } from "../interface/formMedidor";
import { listarTarifas } from "../../tarifa/service/tarifasService";
import { TarifaI } from "../../tarifa/interface/tarifa";

export const EditarMedidorModal = ({ medidor, closeModal, isOpen }: {
    medidor: string,
    closeModal: () => void
    isOpen: boolean
}) => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormMedidorI>()
    const [mensaje, setMensaje] = useState<string>()
    const [mesanjeConflicto, setMensajeConflicto] = useState<string>()
    const [mensajeCreado, setMensajeCreado] = useState<string>()
    const [dataTarifa, setDataTarifa] = useState<TarifaI[]>([])
    useEffect(() => {
        medidorOne()

    }, [isOpen])


    const medidorOne = async () => {
        try {


        } catch (error) {
            console.log(error);

        }
    }


    const onSubmit = async (data: FormMedidorI) => {
        try {


        } catch (error) {
            const e = error as AxiosError
            if (e.status == HttpStatus.CONFLICT) {
                const conflicto = e.response?.data as ErrorConflictoI
                console.log(conflicto);

                setMensaje(conflicto.message)
            }


        }

    }

    const tarifas = async () => {
        try {
            const response = await listarTarifas()
            setDataTarifa(response)
        } catch (error) {

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
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Editar medidor</h2>

                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-4">
                            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>


                                <div>

                                    <label className="block text-gray-600 text-sm font-medium mb-1">
                                        Número de medidor
                                    </label>
                                    <input
                                        {...register("numeroMedidor", { validate: value => value ? true : "Ingrese el N° de medidor" })}
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    {errors.numeroMedidor && <p className='text-xs text-red-500'>{errors.numeroMedidor.message}</p>}
                                    {mesanjeConflicto && <p className='text-xs text-red-500'>{mesanjeConflicto}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-600 text-sm font-medium mb-1">
                                        Fecha de instalación
                                    </label>
                                    <input
                                        {...register("fechaInstalacion", { validate: value => value ? true : "Ingrese la fecha de instalación" })}
                                        type="date"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    {errors.fechaInstalacion && <p className='text-xs text-red-500'>{errors.fechaInstalacion.message}</p>}
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-gray-600 text-sm font-medium mb-1">
                                        Observaciones
                                    </label>
                                    <textarea
                                        {...register("descripcion")}
                                        rows={3}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Ingrese alguna observación..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-600 text-sm font-medium mb-1">
                                        Dirección del medidor
                                    </label>
                                    <input
                                        {...register("direccion", { validate: value => value ? true : "Ingrese la dirección" })}
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    {errors.direccion && <p className='text-xs text-red-500'>{errors.direccion.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-600 text-sm font-medium mb-1">
                                        Seleccione la tarifa
                                    </label>
                                    <select
                                        {...register("tarifa", { validate: value => value ? true : "Seleccione una tarifa" })}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        <option value="">Seleccione una tarifa</option>
                                        {dataTarifa.map((item) => (
                                            <option value={item._id} key={item._id}>{item.nombre}</option>
                                        ))}
                                    </select>
                                    {errors.tarifa && <p className='text-xs text-red-500'>{errors.tarifa.message}</p>}
                                </div>

                                {mensajeCreado && <p className="col-span-2 text-center text-2xl text-green-700">{mensajeCreado}</p>}

                                <button
                                    type="submit"
                                    className="col-span-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
                                >
                                    Registrar Medidor
                                </button>
                            </form>

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};