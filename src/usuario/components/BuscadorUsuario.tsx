import { useEffect, useState } from "react";
import { listarRolesPublic } from "../../rol/service/rolService";
import { ListarRolesI } from "../../rol/interface/ListarRoles";
import { useForm } from "react-hook-form";
import { BuscadorUsuarioI } from "../interface/buscadorCliente";

export const BuscadorUsuario = ({ onSubmit }: { onSubmit: (onSubmit: BuscadorUsuarioI) => void }) => {
    const [roles, setRoles] = useState<ListarRolesI[]>([])
    const { handleSubmit, register } = useForm<BuscadorUsuarioI>()
    useEffect(() => {
        listarRoles()
    }, [])
    const listarRoles = async () => {
        try {
            const response = await listarRolesPublic()
            setRoles(response)
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                <input
                    {...register("ci")}
                    name="ci"
                    type="text"
                    placeholder="Cédula de Identidad"
                    className="p-2 border rounded-md w-full"
                />
                <input
                    {...register("nombre")}
                    name="nombre"
                    type="text"
                    placeholder="Nombre"
                    className="p-2 border rounded-md w-full"
                />
                <input
                    {...register("apellidoPaterno")}
                    name="apellidoPaterno"
                    type="text"
                    placeholder="Apellido Paterno"
                    className="p-2 border rounded-md w-full"
                />
                <input
                    {...register("apellidoMaterno")}
                    name="apellidoMaterno"
                    type="text"
                    placeholder="Apellido Materno"
                    className="p-2 border rounded-md w-full"
                />
                <select
                    {...register("rol")}
                    name="rol"
                    className="p-2 border rounded-md w-full">
                    <option>Seleccion el rol</option>
                    {roles.map((item, i) => (
                        <option value={item._id} key={i}>
                            {item.nombre}
                        </option>
                    ))}
                </select>
                <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full sm:w-full md:w-auto">
                    Buscar
                </button>
            </form>
        </div>


    );
};
