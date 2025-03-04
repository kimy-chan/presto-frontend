import { MdDelete } from "react-icons/md";
import { RangoI } from "../interface/rango";
import { FaEdit } from "react-icons/fa";

export const Rango = ({ isOpen, closeModal, data }: { isOpen: boolean, closeModal: () => void, data: RangoI[] }) => {

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
                            <h2 className="text-xl font-semibold">{data.length > 0 && data[0].tarifa}</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-4">
                            <table className="min-w-full">
                                <thead className="bg-gray-200 text-gray-700 uppercase">
                                    <tr className='text-sm'>
                                        <th className="py-3 px-4 border-b text-left">Rango 1</th>
                                        <th className="py-3 px-4 border-b text-left">Rango 2</th>
                                        <th className="py-3 px-4 border-b text-left">costo</th>
                                        <th className="py-3 px-4 border-b text-left">Accion</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index} className="text-sm border-b hover:bg-gray-100 transition duration-200">

                                            <td className="py-3 px-4">{item.rango1}</td>
                                            <td className="py-3 px-4">{item.rango2}</td>
                                            <td className="py-3 px-4">{item.costo}</td>
                                            <td className="py-2 px-4">

                                                <button className=" text-red-500 text-2xl px-3 py-1 rounded">
                                                    <MdDelete />
                                                </button>
                                                <button className=" text-blue-500 text-2xl px-3 py-1 rounded">
                                                    <FaEdit />
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
