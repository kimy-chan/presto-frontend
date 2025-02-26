import { useForm } from "react-hook-form";
import { BuscadorLecturaI } from "../interface/buscadorLectura";


export const BuscadorLectura = ({ onSubmit }: { onSubmit: (data: BuscadorLecturaI) => void }) => {
    const { register, handleSubmit } = useForm<BuscadorLecturaI>();

    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Campo: Número de Medidor */}
                <div>
                    <label htmlFor="numeroMedidor" className="block text-gray-700 font-semibold mb-2">Número de Medidor</label>
                    <input {...register("numeroMedidor")} id="numeroMedidor"
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                {/* Campo: Mes */}
                <div>
                    <label htmlFor="mes" className="block text-gray-700 font-semibold mb-2">Mes</label>
                    <select
                        {...register("mes")}
                        id="mes"
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Seleccione el mes</option>
                        {meses.map((item, index) => <option value={item} key={index}>{item}</option>)}
                    </select>
                </div>

                {/* Campo: Fecha de Inicio */}
                <div>
                    <label htmlFor="fechaInicio" className="block text-gray-700 font-semibold mb-2">Fecha de Inicio</label>
                    <input
                        type="date"
                        {...register("fechaInicio")}
                        id="fechaInicio"
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Campo: Fecha de Fin */}
                <div>
                    <label htmlFor="fechaFin" className="block text-gray-700 font-semibold mb-2">Fecha de Fin</label>
                    <input

                        type="date"
                        {...register("fechaFin")}
                        id="fechaFin"
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div >
                    <button type="submit" className="mt-6 bg-blue-500 text-white p-2 sm:p-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Buscar
                    </button>
                </div>
            </div>
        </form>
    );
};
