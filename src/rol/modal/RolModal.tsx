import { useState } from "react";
import { DataRol } from "../interface/dataRo";
import { CrearRol } from "../service/rolService";

// Definición de tipos para permisos y módulos
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

export const RolModal = () => {
    const [isOpen, setIsOpen] = useState(false);
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
    };


    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

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

            const response = await CrearRol(dataRol)
            console.log(response);

        } catch (error) {
            console.log(error);

        }
        closeModal();
    };

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

                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">Asignar Rol</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-4">
                            <form>
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

                                {/* Módulos con permisos */}
                                <div className="mb-4">
                                    <p className="font-semibold text-sm mb-2">Permisos por Módulo</p>

                                    {/* Contenedor para los módulos en dos columnas */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {/* Iteramos sobre los módulos */}
                                        {Object.keys(availablePermissions).map((module) => (
                                            <div key={module} className="mb-4">
                                                <p className="text-lg font-semibold text-gray-800 mb-2">
                                                    {module.charAt(0).toUpperCase() + module.slice(1)}
                                                </p>
                                                <div className="flex flex-col space-y-2">
                                                    {/* Iteramos sobre los permisos del módulo */}
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
                            </form>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Guardar
                            </button>
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 ml-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
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
