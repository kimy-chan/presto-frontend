import { useForm } from "react-hook-form";
import { BuscadorPagosI } from "../interface/buscadorPagos";

export const BuscadorPagos = ({ onSubmit }: { onSubmit: (data: BuscadorPagosI) => void }) => {
    const { handleSubmit, register } = useForm<BuscadorPagosI>()
    return (
        <div className="p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-8 gap-4 items-center">

                <div className="flex flex-col">
                    <label className="text-sm font-medium">CI</label>
                    <input {...register("ci")} type="text" className="p-2 border border-gray-300 rounded mt-1" />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">Nombre</label>
                    <input type="text" {...register("nombre")} className="p-2 border border-gray-300 rounded mt-1" />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">Apellido paterno</label>
                    <input type="text" {...register("apellidoPaterno")} className="p-2 border border-gray-300 rounded mt-1" />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Apellido materno</label>
                    <input type="text" {...register("apellidoMaterno")} className="p-2 border border-gray-300 rounded mt-1" />
                </div>


                <div className="flex flex-col">
                    <label className="text-sm font-medium">Número de Medidor</label>
                    <input type="text" {...register("numeroMedidor")} className="p-2 border border-gray-300 rounded mt-1" />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">Fecha Inicio</label>
                    <input type="date" {...register("fechaInicio")} className="p-2 border border-gray-300 rounded mt-1" />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">Fecha Fin</label>
                    <input type="date" {...register("fechaFin")} className="p-2 border border-gray-300 rounded mt-1" />
                </div>

                <div className="flex flex-col">
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
                </div>
            </form>
        </div>
    );
};
