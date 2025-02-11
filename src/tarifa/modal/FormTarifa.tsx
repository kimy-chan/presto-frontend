import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormTarifaI } from '../interface/formTarifa';
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from 'react-icons/md';
import { DataI } from '../interface/data';
import { crearTarifa } from '../service/tarifasService';

export const FormTarifa = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit } = useForm<FormTarifaI>()
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [tarifas, setTarifas] = useState<FormTarifaI[]>([])
    const [nombre, setNombre] = useState<string>('')

    const onsubmit = (data: FormTarifaI) => {
        data.uuid = uuidv4()
        setNombre(data.nombre)
        setTarifas((prev) => [...prev, data])
    }

    const guardar = async () => {
        const data: DataI = {
            nombre: nombre,
            rangos: tarifas.map((item) => {
                return { rango1: Number(item.rango1), rango2: Number(item.rango2), precio: Number(item.precio) }
            })
        }
        try {
            const response = await crearTarifa(data)
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
                Abrir Modal
            </button>


            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={closeModal}
                    ></div>


                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-150">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Título del Modal</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-4">
                            <form onSubmit={handleSubmit(onsubmit)} >
                                <div className="grid grid-cols-2 gap-4">

                                    <div className="col-span-2 sm:col-span-2">
                                        <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">
                                            Nombre
                                        </label>
                                        <input
                                            {...register("nombre")}
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            placeholder="Ingresa tu nombre"
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                    </div>


                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="rango1" className="block text-gray-700 font-bold mb-2">
                                            Rango 1
                                        </label>
                                        <input
                                            {...register("rango1")}
                                            type="number"
                                            id="rango1"
                                            name="rango1"
                                            placeholder="Ingresa rango 1"
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                    </div>


                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="rango2" className="block text-gray-700 font-bold mb-2">
                                            Rango 2
                                        </label>
                                        <input
                                            {...register("rango2")}
                                            type="number"
                                            id="rango2"
                                            name="rango2"
                                            placeholder="Ingresa rango 2"
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">

                                        <label htmlFor="precio" className="block text-gray-700 font-bold mb-2">
                                            Precio
                                        </label>
                                        <input
                                            {...register("precio")}
                                            type="number"
                                            id="precio"
                                            name="precio"
                                            placeholder="Ingresa el precio"
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                    >
                                        Registar
                                    </button>
                                </div>
                            </form>

                        </div>



                        {tarifas.length > 0 && <>
                            <table className="min-w-full">
                                <thead className="bg-gray-200 text-gray-700 uppercase">
                                    <tr className='text-sm'>
                                        <th className="py-3 px-4 border-b text-left">Nombre</th>
                                        <th className="py-3 px-4 border-b text-left">Rango 1</th>
                                        <th className="py-3 px-4 border-b text-left">Rango 2</th>
                                        <th className="py-3 px-4 border-b text-left">Precio</th>
                                        <th className="py-3 px-4 border-b text-center">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tarifas.map((item, index) => (
                                        <tr key={index} className="text-sm border-b hover:bg-gray-100 transition duration-200">
                                            <td className="py-3 px-4">{item.nombre}</td>
                                            <td className="py-3 px-4">{item.rango1}</td>
                                            <td className="py-3 px-4">{item.rango2}</td>
                                            <td className="py-3 px-4">{item.precio}</td>
                                            <td className="py-3 px-4 text-center">
                                                <button onClick={() => {
                                                    const tarifa = tarifas.filter((i) => i.uuid !== item.uuid)
                                                    setTarifas(tarifa)

                                                }} className=" text-red-600 text-2xl">
                                                    <MdDelete />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-4">
                                <button
                                    onClick={guardar}
                                    type="submit"
                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                >
                                    Guardar
                                </button>
                            </div>
                        </>}
                    </div>





                </div>


            )}
        </div>
    );
};
