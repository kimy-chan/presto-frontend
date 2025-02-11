import { useEffect, useState } from "react";
import { ClientesModal } from "../../cliente/modal/ClientesModal";
import { RegistarClienteModal } from "../../cliente/modal/RegistrarCliente";
import { listarTarifas } from "../../tarifa/service/tarifasService";
import { TarifaI } from "../../tarifa/interface/tarifa";

export const FormMedidor = () => {
    const [dataTarifa, setDataTarifa] = useState<TarifaI[]>([])
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
    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Registrar Medidor</h2>
            <div className="grid-cols-2">
                <ClientesModal />
                <RegistarClienteModal />
            </div>
            <form className="space-y-4">

                <div>
                    <label className="block text-gray-600 text-sm font-medium mb-1">
                        Ingrese el número de serie
                    </label>
                    <input
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
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>


                <div>
                    <label className="block text-gray-600 text-sm font-medium mb-1">
                        Observaciones
                    </label>
                    <textarea
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Ingrese alguna observación..."
                    />
                </div>

                <div>
                    <label className="block text-gray-600 text-sm font-medium mb-1">
                        Seleccione la tarifa
                    </label>
                    <select
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

