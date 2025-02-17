import { useEffect, useState } from "react";
import { ClienteI } from "../interface/cliente";
import { listarClientes } from "../services/clienteService";

export const TablaCliente = () => {
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
    <div className="overflow-x-auto max-w-full">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4">Cod</th>
            <th className="py-2 px-4">Ci</th>
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Apellido Paterno</th>
            <th className="py-2 px-4">Apellido Materno</th>

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
              <td className="py-2 px-4">
                <button className="text-blue-500 hover:text-blue-700">Ver</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};
