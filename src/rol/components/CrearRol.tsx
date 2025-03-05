import { useState } from "react";
import { DataRol } from "../interface/dataRo";
import { crearRol } from "../service/rolService";


interface Permission {
    id: string;
    label: string;
}

interface ModulePermissions {
    [module: string]: Permission[];
}

interface PermissionsState {
    [permissionId: string]: boolean;
}

export const CrearRol = () => {

    const [roleName, setRoleName] = useState("");
    const [permissions, setPermissions] = useState<PermissionsState>({});
    const availablePermissions: ModulePermissions = {
        GASTO: [
            { id: "LISTAR_GASTO", label: "Ver Gastos" },
            { id: "CREAR_GASTO", label: "Crear Gastos" },
            { id: "EDITAR_GASTO", label: "Editar Gastos" },
            { id: "ELIMINAR_GASTO", label: "Eliminar Gastos" },
        ],
        LECTURA: [
            { id: "CREAR_LECTURA", label: "Ver Lecturas" },
            { id: "LISTAR_LECTRURA", label: "Crear Lecturas" },
            { id: "EDITAR_LECTURA", label: "Editar Lecturas" },
            { id: "ELIMINAR_LECTURA", label: "Eliminar Lecturas" },
        ],
        PAGO: [
            { id: "LISTAR_PAGO", label: "listar Pagos" },
            { id: "CREAR_PAGO", label: "Crear Pagos" },
            { id: "ANULAR_PAGO", label: "Anular Pago" },
        ],
        TARIFA: [
            { id: "LISTAR_TARIFA", label: "Ver Tarifas" },
            { id: "EDITAR_TARIFA", label: "Editar Tarifas" },
            { id: "CREAR_TARIFA", label: "Crear Tarifas" },
            { id: "ELIMINAR_TARIFA", label: "Eliminar Tarifas" },
        ],
        MEDIDOR: [
            { id: "LISTAR_MEDIDOR", label: "Ver Medidor" },
            { id: "EDITAR_MEDIDOR", label: "Editar Medidor" },
            { id: "CREAR_MEDIDOR", label: "Crear Medidor" },
            { id: "ELIMINAR_MEDIDOR", label: "Eliminar Medidor" },
        ],
        ROL: [
            { id: "LISTAR_ROL", label: "Ver Rol" },
            { id: "EDITAR_ROL", label: "Editar Rol" },
            { id: "CREAR_ROL", label: "Crear Rol" },
            { id: "ELIMINAR_ROL", label: "Eliminar Rol" },
        ],

        Cliente: [
            { id: "LISTAR_CLIENTE", label: "Ver Cliente" },
            { id: "EDITAR_CLIENTE", label: "Editar Clinte" },
            { id: "CREAR_CLIENTE", label: "Crear cliente" },
            { id: "ELIMINAR_CLIENTE", label: "Eliminar Cliente" },
        ],
    };



    // Cambiar el estado de los permisos
    const handlePermissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setPermissions((prevPermissions) => ({
            ...prevPermissions,
            [name]: checked,
        }));
    };

    // Enviar los datos del rol y permisos seleccionados
    const handleSubmit = async () => {
        const selectedPermissions = Object.keys(permissions).filter(
            (permissionId) => permissions[permissionId]
        );
        const dataRol: DataRol = {
            nombre: roleName,
            permisos: selectedPermissions
        }

        try {
            console.log(dataRol);

            const response = await crearRol(dataRol)
            console.log(response);

        } catch (error) {
            console.log(error);

        }

    };

    return (
        <div className="rounded-lg shadow-lg p-6  ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Asignar Rol</h2>
            </div>
            <div className="mt-4">
                <form>
                    <div className="grid grid-cols-1 gap-6">
                        {/* Primera fila: Nombre del Rol */}
                        <div className="mb-4">
                            <label
                                htmlFor="roleName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Nombre del Rol
                            </label>
                            <input
                                id="roleName"
                                type="text"
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
                                className="mt-1 p-2 w-full border rounded-md"
                                placeholder="Ingrese el nombre del rol"
                            />
                        </div>

                        {/* Segunda fila: Permisos por Módulo */}
                        <div className="mb-4">
                            <p className="font-semibold text-sm mb-2">Permisos por Módulo</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {Object.keys(availablePermissions).map((module) => (
                                    <div key={module} className="mb-4">
                                        <p className="text-lg font-semibold text-gray-800 mb-2">
                                            {module.charAt(0).toUpperCase() + module.slice(1)}
                                        </p>
                                        <div className="flex flex-col space-y-2">
                                            {availablePermissions[module].map((permission) => (
                                                <label key={permission.id} className="flex items-center text-sm">
                                                    <input
                                                        type="checkbox"
                                                        name={permission.id}
                                                        checked={permissions[permission.id] || false}
                                                        onChange={handlePermissionChange}
                                                        className="mr-2"
                                                    />
                                                    {permission.label}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Guardar
                </button>
            </div>
        </div>


    );
};
