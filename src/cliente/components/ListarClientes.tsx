import { useEffect, useState } from "react";
import { ClienteI } from "../interface/cliente";
import { listarClientes } from "../services/clienteService";
import { HttpStatus } from "../../core/enums/httpStatus";
import { BuscadorCliente } from "./BuscadorCliente";
import { Paginador } from "../../core/components/Paginador";
import { ItemsPagina } from "../../core/components/ItemsPAgina";

export const ListarClientes = () => {
  const [data, setData] = useState<ClienteI[]>([])
  const [pagina, setPagina] = useState<number>(1)
  const [limite, setLimite] = useState<number>(20)
  const [paginas, setPaginas] = useState<number>(1)
  const [nombre, setNombre] = useState<string>('')
  const [ci, setCi] = useState<string>('')
  const [codigo, setCodigo] = useState<string>('')
  const [apellidoPaterno, setApellidoPaterno] = useState<string>('')
  const [apellidoMaterno, setApellidoMaterno] = useState<string>('')
  useEffect(() => {
    listar()
  }, [limite, pagina, nombre, apellidoMaterno, ci, codigo, apellidoPaterno])

  const listar = async () => {
    try {

      const response = await listarClientes(limite,
        pagina, codigo,
        ci, apellidoMaterno,
        apellidoPaterno,
        nombre)
      if (response.status == HttpStatus.OK) {
        setData(response.data)
        setPaginas(response.paginas)
      }
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className="overflow-x-auto max-w-full">
      <BuscadorCliente
        setApellidoMaterno={setApellidoMaterno}
        setApellidoPaterno={setApellidoPaterno}
        setCi={setCi}
        setCodigo={setCodigo}
        setNombre={setNombre}
      />
      <div className="relative overflow-x-aut">
        <ItemsPagina limite={setLimite} />
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
       
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={item._id}>
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
        <Paginador paginaActual={pagina} paginaSeleccionada={setPagina} paginas={paginas} />
      </div>
    </div>
  );
};
