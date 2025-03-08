import { useContext, useEffect, useState } from "react";
import { ClienteI } from "../interface/cliente";
import { eliminarCliente, listarClientes } from "../services/clienteService";
import { HttpStatus } from "../../core/enums/httpStatus";
import { BuscadorCliente } from "./BuscadorCliente";
import { Paginador } from "../../core/components/Paginador";
import { ItemsPagina } from "../../core/components/ItemsPAgina";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { EditarClienteModal } from "../modal/EditarClienteModal";
import { PermisosContext } from "../../autenticacion/context/PermisosContext";
import { PermisosE } from "../../core/enums/permisos";

export const ListarClientes = () => {
  const { permisosCliente } = useContext(PermisosContext)


  const [data, setData] = useState<ClienteI[]>([])
  const [pagina, setPagina] = useState<number>(1)
  const [limite, setLimite] = useState<number>(20)
  const [paginas, setPaginas] = useState<number>(1)
  const [nombre, setNombre] = useState<string>('')
  const [ci, setCi] = useState<string>('')
  const [codigo, setCodigo] = useState<string>('')
  const [apellidoPaterno, setApellidoPaterno] = useState<string>('')
  const [apellidoMaterno, setApellidoMaterno] = useState<string>('')
  const [cliente, setCliente] = useState<string>()
  const [isOpen, setIsOpen] = useState(false);


  const closeModal = () => setIsOpen(false);
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



  const editarCliente = (cliente: string) => {
    setCliente(cliente)
    setIsOpen(true)
  }

  const eliminar = async (cliente: string) => {
    try {
      const response = await eliminarCliente(cliente)
      if (response.status == HttpStatus.OK) {

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

        <table
          className="min-w-full text-start text-sm font-light text-surface dark:text-white">
          <thead
            className="bg-gray-700 text-white">
            <tr>
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
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-center" key={item._id}>
                <td className="py-2 px-4">{item.codigo}</td>
                <td className="py-2 px-4">{item.ci}</td>
                <td className="py-2 px-4">{item.nombre}</td>
                <td className="py-2 px-4">{item.apellidoPaterno}</td>
                <td className="py-2 px-4">{item.apellidoMaterno}</td>
                <td className="py-2 px-4">
                  {permisosCliente.some((i) => i.includes(PermisosE.ELIMINAR_CLIENTE)) && <button onClick={() => eliminar(item._id)} className=" text-red-500 text-2xl px-3 py-1 rounded">
                    <MdDelete />
                  </button>}
                  {permisosCliente.some((i) => i.includes(PermisosE.EDITAR_CLIENTE)) && <button onClick={() => editarCliente(item._id)} className=" text-blue-500 text-2xl px-3 py-1 rounded">
                    <FaEdit />
                  </button>}
                </td>
              </tr>
            ))}

          </tbody>
        </table>

        <Paginador paginaActual={pagina} paginaSeleccionada={setPagina} paginas={paginas} />
      </div>
      {isOpen && cliente && <EditarClienteModal cliente={cliente} closeModal={closeModal} isOpen={isOpen} />}
    </div>
  );
};
