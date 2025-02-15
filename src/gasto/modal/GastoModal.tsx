import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormGastoI } from "../interface/formGasto";
import { crearGasto } from "../service/gastoService";
import { HttpStatus } from "../../core/enums/httpStatus";
import { listarCategoriaGasto } from "../../categoriaGasto/service/categoriaGastoService";
import { CategoriaGastoI } from "../../categoriaGasto/interface/categoriaGasto";


export const GastoModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit } = useForm<FormGastoI>()
    const [categoriaGastos, setCategoriaGastos] = useState<CategoriaGastoI[]>([])


    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const onsubmit = async (data: FormGastoI) => {
        try {
            data.costoUnitario = Number(data.costoUnitario)
            data.cantidad = Number(data.cantidad)
            data.factorValides = Number(data.factorValides)
            const response = await crearGasto(data)
            if (response.status == HttpStatus.CREATED) {

            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect((

    ) => { categoriaGasto() }, [])

    const categoriaGasto = async () => {
        try {
            const response = await listarCategoriaGasto()
            setCategoriaGastos(response)
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


                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-md">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Registar gastos</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-4">
                            <form onSubmit={handleSubmit(onsubmit)} >
                                <div>
                                    <label className="block text-gray-700 font-medium">Descripción</label>
                                    <textarea {...register("descripcion")} className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Unidad de manejo</label>
                                    <input {...register("unidadManejo")} type="text" className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Cantidad</label>
                                    <input {...register("cantidad")} type="number" className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Consto Unitario</label>
                                    <input {...register("costoUnitario")} type="number" className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Factor validez</label>
                                    <input {...register("factorValides")} type="text" className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300" />
                                </div>
                                <div>
                                    <label htmlFor="categoriaGasto" className="block text-gray-700 font-medium">Categoría de gasto</label>
                                    <select id="categoriaGasto" {...register("categoriaGasto")} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">Seleccione la categoría de gasto</option>
                                        {categoriaGastos.map((item) => <option key={item._id} value={item._id}>{item.nombre}</option>)}
                                    </select>
                                </div>
                                <button className="mt-2 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">Guardar</button>
                            </form>

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};
