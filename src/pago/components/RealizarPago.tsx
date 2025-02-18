
import { BuscarPago } from "./BuscarPago";

export const RealizarPago = () => {

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Realizar Pago</h2>

            {/* Descripción */}
            <p className="text-sm text-gray-600 mb-6 text-center">
                Complete el formulario para realizar el pago de su servicio. Asegúrese de ingresar los datos correctamente.
            </p>
            <BuscarPago />

            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="text-sm text-gray-700">Código cliente: <span className="font-semibold">2</span></p>
                <p className="text-sm text-gray-700">CI: <span className="font-semibold">2</span></p>
                <p className="text-sm text-gray-700">Nombre: <span className="font-semibold">Juanca Rlos</span></p>
                <p className="text-sm text-gray-700">Código de medidor: <span className="font-semibold">2</span></p>
                <p className="text-sm text-gray-700">Lectura actual: <span className="font-semibold">234</span></p>
                <p className="text-sm text-gray-700">Categoría: <span className="font-semibold">234</span></p>
                <p className="text-sm text-gray-700">Lectura anterior: <span className="font-semibold">234</span></p>
                <p className="text-sm text-gray-700">Estado: <span className="font-semibold">Activo</span></p>
                <p className="text-sm text-gray-700">Monto a pagar: <span className="font-semibold">12.5</span></p>
                <p className="text-sm text-gray-700">Mes: <span className="font-semibold">Marzo</span></p>
            </div>

            {/* Campo Monto a Cancelar */}
            <div className="mb-4">
                <label htmlFor="monto" className="block text-sm font-medium text-gray-700">Ingrese el monto a cancelar</label>
                <input type="text" id="monto" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            {/* Campo Observaciones */}
            <div className="mb-4">
                <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700">Observaciones</label>
                <textarea
                    id="observaciones"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

                    placeholder="Escriba aquí sus observaciones"
                />
            </div>

            {/* Botón de Pago */}
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Realizar Pago
            </button>
        </div>
    );
};
