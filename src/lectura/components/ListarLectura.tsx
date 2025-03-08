import { useContext, useEffect, useState } from "react";
import { eliminarLectura, listarLecturas } from "../service/lecturaService";
import { ListarLecturaI } from "../interface/listarLecturas";
import { BuscadorLectura } from "./BuscadorLectura";
import { useNavigate } from "react-router";
import { BuscadorLecturaI } from "../interface/buscadorLectura";
import { ItemsPagina } from "../../core/components/ItemsPAgina";
import { Paginador } from "../../core/components/Paginador";
import { HttpStatus } from "../../core/enums/httpStatus";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { EditarLecturaModal } from "../modal/EditarLecturaModal";
import { EstadoPagoE } from "../../pago/enum/estadoPago";
import { PermisosContext } from "../../autenticacion/context/PermisosContext";
import { PermisosE } from "../../core/enums/permisos";

export const ListarLectura = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<ListarLecturaI[]>([]);
    const [lectura, setLectura] = useState<string>()
    const [isOpen, setIsOpen] = useState(false);
    const { permisosLectura } = useContext(PermisosContext)
    const closeModal = () => setIsOpen(false);
    const [buscador, setBuscador] = useState<BuscadorLecturaI>(
        {
            fechaFin: null,
            fechaInicio: null,
            mes: null,
            numeroMedidor: null
        }
    )
    const [pagina, setPagina] = useState<number>(1)
    const [limite, setLimite] = useState<number>(20)
    const [paginas, setPaginas] = useState<number>(1)

    useEffect(() => {
        lecturas()
    }, [limite, pagina, buscador])

    const lecturas = async () => {
        try {
            const response = await listarLecturas(limite, pagina, buscador)
            if (response.status == HttpStatus.OK) {
                setData(response.data)
                setPaginas(response.paginas)
            }
        } catch (error) {
            console.log(error);

        }
    }

    const editarLectura = (lectura: string) => {
        setLectura(lectura)
        setIsOpen(true)


    }

    const eliminar = async (lectura: string) => {
        try {
            const response = await eliminarLectura(lectura)
            if (response.status == HttpStatus.OK) {

            }
        } catch (error) {

        }
    }
    return (
        <>


            <BuscadorLectura onSubmit={setBuscador} />
            <ItemsPagina limite={setLimite} />

            <div className="flex flex-col overflow-x-auto">
                <div className="sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-x-auto">
                            <table
                                className="min-w-full text-start text-sm font-light text-surface dark:text-white">
                                <thead
                                    className="border-b border-neutral-200 font-medium dark:border-white/10">
                                    <tr className="bg-gray-700 text-white text-left">
                                        <th scope="col" className="px-6 py-4">CI</th>
                                        <th scope="col" className="px-6 py-4">Nombre</th>
                                        <th scope="col" className="px-6 py-4">Apellidos</th>
                                        <th scope="col" className="px-6 py-4">Gestion</th>
                                        <th scope="col" className="px-6 py-4">N° Medidor</th>
                                        <th scope="col" className="px-6 py-4">Mes</th>
                                        <th scope="col" className="px-6 py-4">Lect. Ant</th>
                                        <th scope="col" className="px-6 py-4">Lect. Act</th>
                                        <th scope="col" className="px-6 py-4">Cons (m³)</th>
                                        <th scope="col" className="px-6 py-4">Monto</th>
                                        <th scope="col" className="px-6 py-4">Estado</th>
                                        <th scope="col" className="px-6 py-4">fecha</th>
                                        <th scope="col" className="px-6 py-4">recibo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item) => (
                                            <tr className="border-b border-neutral-200 dark:border-white/10">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{item.ci}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.nombre}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.apellidoPaterno} {item.apellidoMaterno}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.gestion}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.numeroMedidor}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.mes}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.lecturaAnterior}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.lecturaActual}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.consumoTotal}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.costoApagar}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.estado}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.fecha}</td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <button
                                                        onClick={() => navigate(`/lectura/recibo/${item._id}`)}
                                                        className="bg-green-600 p-1 rounded-2xl text-white">
                                                        Recibo
                                                    </button>

                                                    {item.estado != EstadoPagoE.PAGADO &&

                                                        permisosLectura.some((i) => i.includes(PermisosE.ELIMINAR_LECTURA)) && (<button onClick={() => eliminar(item._id)} className=" text-red-500 text-2xl px-3 py-1 rounded">
                                                            <MdDelete />
                                                        </button>)


                                                    }


                                                    {item.estado != EstadoPagoE.PAGADO && permisosLectura.some((i) => i.includes(PermisosE.EDITAR_LECTURA)) && (<button onClick={() => editarLectura(item._id)} className=" text-blue-500 text-2xl px-3 py-1 rounded">
                                                        <FaEdit />
                                                    </button>)}

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
            {isOpen && lectura && <EditarLecturaModal closeModal={closeModal} isOpen={isOpen} lectura={lectura} />}
        </>
    );
}
