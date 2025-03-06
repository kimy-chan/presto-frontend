import { useEffect, useState } from 'react'
import { Paginador } from '../../core/components/Paginador'
import { ItemsPagina } from '../../core/components/ItemsPAgina'
import { CrearUsuariosModal } from '../modal/CrearUsuariosModal'
import { eliminarUsuario, listarUsuarios } from '../service/usuarioService'
import { ListarUsuariosI } from '../interface/listarUsuarios'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { EditarUsuarioModal } from '../modal/EditarUsuarioModal'
import { HttpStatus } from '../../core/enums/httpStatus'
import { BuscadorUsuario } from './BuscadorUsuario'
import { BuscadorUsuarioI } from '../interface/buscadorCliente'

export const ListarUsuarios = () => {
    const [buscador, setBuscador] = useState<BuscadorUsuarioI>()
    const [pagina, setPagina] = useState<number>(1)
    const [limite, setLimite] = useState<number>(20)
    const [paginas, setPaginas] = useState<number>(1)
    const [usuario, setUsuario] = useState<string>()
    const [usuarios, setUsuarios] = useState<ListarUsuariosI[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [recargar, setRecargar] = useState<boolean>(false);

    const closeModal = () => setIsOpen(false);
    console.log(buscador);

    useEffect(() => {
        listar()
    }, [recargar])
    const listar = async () => {
        try {
            const response = await listarUsuarios()
            setUsuarios(response)
        } catch (error) {
            console.log(error);

        }
    }

    const editarUsuario = (usuario: string) => {
        setUsuario(usuario)
        setIsOpen(true)
    }

    const eliminar = async (usuario: string) => {
        try {
            const response = await eliminarUsuario(usuario)
            console.log(response);

            if (response.status == HttpStatus.OK) {
                setRecargar(!recargar)
            }
        } catch (error) {
            console.log(error);

        }

    }

    return (
        < >
            <CrearUsuariosModal />
            <BuscadorUsuario onSubmit={setBuscador} />
            <ItemsPagina limite={setLimite} />
            <div className="flex flex-col overflow-x-auto">
                <div className="sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-x-auto">
                            <table
                                className="min-w-full text-start text-sm font-light text-surface dark:text-white">
                                <thead
                                    className="border-b border-neutral-200 font-medium dark:border-white/10">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">CI</th>
                                        <th scope="col" className="px-6 py-4">Nombre</th>
                                        <th scope="col" className="px-6 py-4">Apellidos</th>
                                        <th scope="col" className="px-6 py-4">Usuario</th>
                                        <th scope="col" className="px-6 py-4">Celular</th>
                                        <th scope="col" className="px-6 py-4">Direccion</th>
                                        <th scope="col" className="px-6 py-4">Rol</th>
                                        <th scope="col" className="px-6 py-4">Accion</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        usuarios.map((item, i) => (
                                            <tr className="border-b border-neutral-200 dark:border-white/10" key={i}>
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{item.ci}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.nombre}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.apellidoPaterno} {item.apellidoMaterno}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.usuario}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.celular}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.direccion}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.rolNombre}</td>

                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <button onClick={() => eliminar(item._id)} className=" text-red-500 text-2xl px-3 py-1 rounded">
                                                        <MdDelete />
                                                    </button>
                                                    <button onClick={() => editarUsuario(item._id)} className=" text-blue-500 text-2xl px-3 py-1 rounded">
                                                        <FaEdit />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>

                            <Paginador paginaActual={pagina} paginaSeleccionada={setPagina} paginas={paginas} />
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && usuario && <EditarUsuarioModal closeModal={closeModal} isOpen={isOpen} usuario={usuario} setRecargar={setRecargar} recargar={recargar} />}
        </>
    )
}
