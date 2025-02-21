
import { useState } from "react";

import { BuscadorClientePago } from "./BuscarClientePago";
import { ClienteMedidorLecturaI } from "../interface/clienteMedidorLectura";
import { useForm } from "react-hook-form";
import { RealizaPago } from "../interface/realizarPago";
import { realizarPagos } from "../service/pagoService";
import { HttpStatus } from "../../core/enums/httpStatus";
import { useNavigate } from "react-router";

export const RealizarPago = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<ClienteMedidorLecturaI>();
    const { register, handleSubmit, formState: { errors } } = useForm<RealizaPago>()


    const onSubmit = async (dataRegistrada: RealizaPago) => {
        try {
            if (data) {
                dataRegistrada.lectura = data.idLectura

                const response = await realizarPagos(dataRegistrada)
                if (response.status == HttpStatus.CREATED) {
                    navigate(`/pago/imprimir/cliente/${response.medidor}`)
                }


            }


        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Realizar Pago</h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
                Complete el formulario para realizar el pago de su servicio. Asegúrese de ingresar los datos correctamente.
            </p>
            <BuscadorClientePago setData={setData} />

            {data && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-lg shadow-md border border-gray-300">
                    {/* Datos del Cliente */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Datos del Cliente</h3>
                        <p><strong>Código cliente:</strong> {data.codigo}</p>
                        <p><strong>CI:</strong> {data.ci}</p>
                        <p><strong>Nombre:</strong> {data.nombre} {data.apellidoPaterno} {data.apellidoMaterno}</p>
                    </div>

                    {/* Datos del Medidor */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Datos del Medidor</h3>
                        <p><strong>Código de medidor:</strong> {data.numeroMedidor}</p>
                        <p><strong>Categoría:</strong> {data.tarifa}</p>
                    </div>

                    {/* Datos de la Lectura */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Datos de la Lectura</h3>
                        <p><strong>Estado medidor:</strong> {data.estado}</p>
                        <p><strong>Lectura anterior:</strong> {data.lecturaAnterior} m³</p>
                        <p><strong>Lectura actual:</strong> {data.lecturaActual} m³</p>
                        <p><strong>Consumo:</strong> {data.consumoTotal} m³</p>
                    </div>

                    {/* Datos del Pago */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Datos del Pago</h3>
                        <p><strong>Estado pago:</strong> {data.estado}</p>
                        <p><strong>Monto a pagar:</strong> {data.costoApagar} Bs</p>

                        <p><strong>Mes:</strong> {data.mes}</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                    <div >
                        <label htmlFor="costoPagado" className="block text-sm font-medium text-gray-700">Ingrese el monto a cancelar</label>
                        <input {...register("costoPagado", {
                            valueAsNumber: true,
                            validate: (value: number) => {
                                if (!value) {
                                    return 'Ingrese el monto a cancelar'
                                }
                                if (value < 0) {
                                    return 'Ingrese el monto correcto'
                                }
                                if (value !== data?.costoApagar) {
                                    return `El monto a pagar debe ser exactamente ${data?.costoApagar}.`;
                                }
                                return true

                            }
                        }

                        )} type="text" id="costoPagado" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        {errors.costoPagado && <p>{errors.costoPagado.message}</p>}
                    </div>

                    {/* Campo Observaciones */}
                    <div>
                        <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700">Observaciones</label>
                        <textarea  {...register("observaciones")} id="observaciones" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Escriba aquí sus observaciones" />
                    </div>
                </div>

                <button type="submit" className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Realizar Pago
                </button>
            </form>
        </div>
    );
};
