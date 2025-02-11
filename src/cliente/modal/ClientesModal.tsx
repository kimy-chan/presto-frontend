import { useEffect, useState } from "react";
import { ClienteI } from "../interface/cliente";
import { listarClientes } from "../services/clienteService";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

export const ClientesModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [data, setData] = useState<ClienteI[]>([])
    useEffect(() => {
        listar()
    }, [])

    const listar = async () => {
        try {
            const response = await listarClientes()
            setData(response)
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
                Buscar cliente
            </button>


            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={closeModal}
                    ></div>

                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-350 ">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Lista de clientes</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-4">
                            <div className="overflow-x-auto max-w-full">
                                <table className="min-w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-200 text-left">
                                            <th className="py-2 px-4">Cod</th>
                                            <th className="py-2 px-4">Ci</th>
                                            <th className="py-2 px-4">Nombre</th>
                                            <th className="py-2 px-4">Apellido Paterno</th>
                                            <th className="py-2 px-4">Apellido Materno</th>
                                            <th className="py-2 px-4">Direccion</th>
                                            <th className="py-2 px-4">Accion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item) => (
                                            <tr className="border-b" key={item._id}>
                                                <td className="py-2 px-4">{item.codigo}</td>
                                                <td className="py-2 px-4">{item.ci}</td>
                                                <td className="py-2 px-4">{item.nombre}</td>
                                                <td className="py-2 px-4">{item.apellidoPaterno}</td>
                                                <td className="py-2 px-4">{item.apellidoMaterno}</td>
                                                <td className="py-2 px-4">{item.direccion}</td>
                                                <td className="py-2 px-4">
                                                    <button className="text-blue-500 hover:text-blue-700 text-2xl"><IoIosAddCircle /></button>
                                                    <button className="text-blue-500 hover:text-blue-700 text-2xl"> <FaEdit /></button>

                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};