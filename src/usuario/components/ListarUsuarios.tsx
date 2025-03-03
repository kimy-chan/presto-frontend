import { useEffect, useState } from 'react'
import { Paginador } from '../../core/components/Paginador'
import { ItemsPagina } from '../../core/components/ItemsPAgina'
import { CrearUsuariosModal } from '../modal/CrearUsuariosModal'
import { listarUsuarios } from '../service/usuarioService'
import { ListarUsuariosI } from '../interface/listarUsuarios'

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
                                        <th className="py-2 px-4">Nombres</th>
                                        <th className="py-2 px-4 hidden md:table-cell">Apellidos</th>
                                        <th className="py-2 px-4">Usuario</th>
                                        <th className="py-2 px-4 hidden md:table-cell">Celular</th>

                                        <th className="py-2 px-4 hidden md:table-cell">Direccion</th>
                                        <th className="py-2 px-4 hidden md:table-cell">Rol</th>


                                        <th className="py-2 px-4 hidden md:table-cell">Accion</th>
                                    </tr>
                                </thead>
                                <tbody>

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
