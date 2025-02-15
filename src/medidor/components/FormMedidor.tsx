import { useEffect, useState } from "react";
import { ClientesModal } from "../../cliente/modal/ClientesModal";
import { RegistarClienteModal } from "../../cliente/modal/RegistrarCliente";
import { listarTarifas } from "../../tarifa/service/tarifasService";
import { TarifaI } from "../../tarifa/interface/tarifa";
import { FormClienteI } from "../../cliente/interface/formCliente";
import { useForm } from "react-hook-form";
import { FormMedidorI } from "../interface/formMedidor";
import { crearMedidor } from "../service/MedidorService";
import { ClienteI } from "../../cliente/interface/cliente";

export const FormMedidor = () => {
    const [dataTarifa, setDataTarifa] = useState<TarifaI[]>([])
    const [cliente, setCliente] = useState<ClienteI>()
    const { register, handleSubmit } = useForm<FormMedidorI>()
    useEffect(() => {
        tarifas()
    }, [])

    const tarifas = async () => {
        try {
            const response = await listarTarifas()
            setDataTarifa(response)
        } catch (error) {

        }
    }
    const onSubmit = async (data: FormMedidorI) => {


        if (cliente) {
            data.cliente = cliente._id
            console.log(data);
            try {
                const response = await crearMedidor(data)
                console.log(response);

            } catch (error) {
                console.log(error);

            }
        }

    }
    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Registrar Medidor</h2>
            <div className="grid grid-cols-2 gap-4">
                <ClientesModal setCliente={setCliente} />
                <RegistarClienteModal setCliente={setCliente} />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                {cliente && (
                    <>
                        <div className=" bg-white rounded-lg shadow-md p-4 border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">Cliente</h2>
                            <div className="text-sm text-gray-600">
                                <p><span className="font-medium text-gray-700">Cod:</span> {cliente.codigo}</p>
                                <p><span className="font-medium text-gray-700">CI:</span> {cliente.ci}</p>
                                <p><span className="font-medium text-gray-700">Nombre:</span> {cliente.nombre}</p>
                                <p><span className="font-medium text-gray-700">Apellido Paterno:</span> {cliente.apellidoPaterno}</p>
                                <p><span className="font-medium text-gray-700">Apellido Materno:</span> {cliente.apellidoMaterno}</p>
                                <p><span className="font-medium text-gray-700">Celular:</span> {cliente.celular}</p>
                                <p><span className="font-medium text-gray-700">Dirección:</span> {cliente.direccion}</p>
                            </div>
                        </div>
                    </>
                )}




                <div>
                    <label className="block text-gray-600 text-sm font-medium mb-1">
                        número de serie del medidor
                    </label>
                    <input
                        {...register("numeroSerie")}
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Ej: MTR-456789"
                    />
                </div>


                <div>

                    <label className="block text-gray-600 text-sm font-medium mb-1">
                        Fecha de instalación
                    </label>
                    <input
                        {...register("fechaInstalacion")}
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>


                <div>
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
                        Direccion del medidor
                    </label>
                    <input
                        {...register("direccion")}
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

                    />
                </div>

                <div>

                    <label className="block text-gray-600 text-sm font-medium mb-1">
                        Seleccione la tarifa
                    </label>
                    <select
                        {...register("tarifa")}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Seleccione una tarifa</option>
                        {dataTarifa.map((item) => (
                            <option value={item._id} key={item._id}>{item.nombre}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Registrar Medidor
                </button>
            </form>
        </div>
    );
};

