import { useContext, useEffect, useState } from 'react'
import { eliminarGasto, listarGastos } from '../service/gastoService'
import { GastoI } from '../interface/gasto'
import { separadorMiles } from '../../core/constants/separadorMiles'
import { PermisosContext } from '../../autenticacion/context/PermisosContext'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { PermisosE } from '../../core/enums/permisos'
import { AlertaEliminar } from '../../core/util/alertaEliminar'
import { Paginador } from '../../core/components/Paginador'
import { BuscadorGasto } from './BuscadorGasto'
import { BuscadorGastoI } from '../interface/BuscadorGasto'
import { HttpStatus } from '../../core/enums/httpStatus'
import { ItemsPagina } from '../../core/components/ItemsPAgina'
import { CrearGastoModal } from '../modal/CrearGastoModal'
import { EditarGastoModal } from '../modal/EditarGastoModal'
import toast from 'react-hot-toast'

export const ListarGasto = () => {
    const { permisosGasto } = useContext(PermisosContext)
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    const [buscador, setBuscador] = useState<BuscadorGastoI>({
        categoriaGasto: '',
        fechaFin: '',
        fechaInicio: ''
    })
    const [pagina, setPagina] = useState<number>(1)
    const [limite, setLimite] = useState<number>(20)
    const [paginas, setPaginas] = useState<number>(1)
    const [recargar, setRecargar] = useState(false)
    const [gastos, setGastos] = useState<GastoI[]>([])
    const [gasto, setGasto] = useState<string>()
    useEffect(() => {
        listar()
    }, [limite, pagina, buscador, recargar])
    const listar = async () => {
        try {
            const response = await listarGastos(limite, pagina, buscador)
            if (response.status == HttpStatus.OK) {
                setGastos(response.data)
                setPaginas(response.paginas)
            }

        } catch (error) {
            console.log(error);

        }
    }
    const eliminar = async (gasto: string) => {
        try {
            const response = await eliminarGasto(gasto)
            if (response.status == HttpStatus.OK) {
                toast.success('Eliminado')
                setRecargar(!recargar)
            }
        } catch (error) {
            console.log(error);

        }
    }

    const editar = async (gasto: string) => {
        setGasto(gasto)
        setIsOpen(true)
    }

    return (
        <div className="flex flex-col overflow-x-auto">
            {permisosGasto.some((i) => i.includes(PermisosE.CREAR_GASTO)) && <CrearGastoModal recargar={recargar} setRecargar={setRecargar} />}
            <BuscadorGasto onSubmit={setBuscador} />

            <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <ItemsPagina limite={setLimite} />
                        <table className="min-w-full border border-gray-300 rounded-lg shadow-lg text-sm sm:text-base">
                            <thead>
                                <tr className="bg-gray-700 text-white text-left text-xs sm:text-sm">
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4">Categoria gasto</th>
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4">Descripcion</th>
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4">Unidad de Manejo</th>
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4">Cantidad</th>
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4">Costo Unitario</th>
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4">Factor Validez P/Año</th>
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4">Costo por Año</th>
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4">fecha</th>
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gastos.map((item, i) => (
                                    <tr key={i} className="odd:bg-gray-100">
                                        <td className="py-2 px-3 sm:px-4">{item.categoria}</td>
                                        <td className="py-2 px-3 sm:px-4">{item.descripcion}</td>
                                        <td className="py-2 px-3 sm:px-4">{item.unidadManejo}</td>
                                        <td className="py-2 px-3 sm:px-4">{item.cantidad}</td>
                                        <td className="py-2 px-3 sm:px-4">{item.costoUnitario.toLocaleString(separadorMiles)}</td>
                                        <td className="py-2 px-3 sm:px-4">{item.factorValides}</td>
                                        <td className="py-2 px-3 sm:px-4">{item.costoAqo.toLocaleString(separadorMiles)}</td>
                                        <td className="py-2 px-3 sm:px-4">{item.fecha}</td>
                                        <td className="py-2 px-3 sm:px-4">
                                            {permisosGasto.some((i) => i.includes(PermisosE.ELIMINAR_GASTO)) && (
                                                <button onClick={() => AlertaEliminar(() => eliminar(item._id))} className="text-red-500 text-xl sm:text-2xl px-3 py-1 rounded">
                                                    <MdDelete />
                                                </button>
                                            )}
                                            {permisosGasto.some((i) => i.includes(PermisosE.EDITAR_GASTO)) && (
                                                <button onClick={() => editar(item._id)} className="text-blue-500 text-xl sm:text-2xl px-3 py-1 rounded">
                                                    <FaEdit />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Paginador paginaActual={pagina} paginaSeleccionada={setPagina} paginas={paginas} />
                    </div>
                </div>
            </div>

            {isOpen && gasto && <EditarGastoModal gasto={gasto} recargar={recargar} setRecargar={setRecargar} closeModal={closeModal} isOpen={isOpen} />}
        </div>

    )
}

