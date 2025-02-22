import React, { useEffect, useState } from "react";
import { listarMedidor } from "../service/MedidorService";
import { MedidorCliente } from "../interface/medidorCliente";

export const ListarMedidor = () => {
    const [data, setData] = useState<MedidorCliente[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        listar();
    }, []);

    const listar = async () => {
        try {
            const response = await listarMedidor();
            setData(response);
        } catch (error) {
            console.error("Error al listar medidores:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="overflow-x-auto max-w-full p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Medidores</h2>

            {loading ? (
                <p className="text-gray-500">Cargando...</p>
            ) : data.length === 0 ? (
                <p className="text-gray-500">No hay datos disponibles.</p>
            ) : (
                <table className="min-w-full border border-gray-300 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-700 text-white text-left">
                            <th className="py-2 px-4">Cod Cliente</th>
                            <th className="py-2 px-4">CI</th>
                            <th className="py-2 px-4">Nombre</th>
                            <th className="py-2 px-4">Apellido Paterno</th>
                            <th className="py-2 px-4">Apellido Materno</th>
                            <th className="py-2 px-4">Cod Medidor</th>
                            <th className="py-2 px-4">N° Medidor</th>
                            <th className="py-2 px-4">Estado</th>
                            <th className="py-2 px-4">Dirección</th>
                            <th className="py-2 px-4">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr key={i} className="odd:bg-gray-100 even:bg-white">
                                <td className="py-2 px-4">{item.codigoCliente}</td>
                                <td className="py-2 px-4">{item.ci}</td>
                                <td className="py-2 px-4">{item.nombre}</td>
                                <td className="py-2 px-4">{item.apellidoPaterno}</td>
                                <td className="py-2 px-4">{item.apellidoMaterno}</td>
                                <td className="py-2 px-4">{item.codigo}</td>
                                <td className="py-2 px-4">{item.numeroMedidor}</td>
                                <td className="py-2 px-4">{item.estado}</td>
                                <td className="py-2 px-4">{item.direccion}</td>
                                <td className="py-2 px-4">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded">
                                        Ver
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
