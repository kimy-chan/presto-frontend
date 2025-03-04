import { useEffect, useState } from 'react'
import { Paginador } from '../../core/components/Paginador'
import { ItemsPagina } from '../../core/components/ItemsPAgina'
import { CrearUsuariosModal } from '../modal/CrearUsuariosModal'
import { listarUsuarios } from '../service/usuarioService'
import { ListarUsuariosI } from '../interface/listarUsuarios'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'

export const ListarUsuarios = () => {
    const [pagina, setPagina] = useState<number>(1)
    const [limite, setLimite] = useState<number>(20)
    const [paginas, setPaginas] = useState<number>(1)
    const [usuarios, setUsuarios] = useState<ListarUsuariosI[]>([])
    useEffect(() => {
        listar()
    }, [])
    const listar = async () => {
        try {
            const response = await listarUsuarios()
            setUsuarios(response)
        } catch (error) {
            console.log(error);

        }
    }
    return (
        < >
            <CrearUsuariosModal />
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
                                        usuarios.map((item) => (
                                            <tr className="border-b border-neutral-200 dark:border-white/10">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{item.ci}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.nombre}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.apellidoPaterno} {item.apellidoMaterno}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.usuario}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.celular}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.direccion}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.rolNombre}</td>

                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <button className=" text-red-500 text-2xl px-3 py-1 rounded">
                                                        <MdDelete />
                                                    </button>
                                                    <button className=" text-blue-500 text-2xl px-3 py-1 rounded">
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

        </>
    )
}
