import { useContext, useEffect, useState } from "react"
import { listarMedidoresConTresLecturasPendientes, realizarCorte } from "../service/MedidorService"
import { Paginador } from "../../core/components/Paginador"

import { ItemsPagina } from "../../core/components/ItemsPAgina"
import { PermisosContext } from "../../autenticacion/context/PermisosContext"
import { MedidorCorteI } from "../interface/MedidoresCorte"
import { HttpStatus } from "../../core/enums/httpStatus"
import { HttpStatusCode } from "axios"
import { alertaConfirmacion } from "../../core/util/alertaConfirmacion"

export const ListarCorteMedidor = () => {
    const { permisosMedidor } = useContext(PermisosContext)
    const [data, setData] = useState<MedidorCorteI[]>([]);
    const [pagina, setPagina] = useState<number>(1)
    const [limite, setLimite] = useState<number>(20)
    const [paginas, setPaginas] = useState<number>(1)
    const [recargar, setRecargar] = useState<boolean>(false)

    useEffect(() => { listarMedidor() }, [recargar])

    const listarMedidor = async () => {
        try {
            const response = await listarMedidoresConTresLecturasPendientes()
            if (response.status == HttpStatus.OK) {
                setData(response.data)
                setPaginas(response.paginas)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const corte = async (id: string) => {
        try {
            const alerta = await alertaConfirmacion()
            console.log(alerta);

            if (alerta) {
                const response = await realizarCorte(id)
                if (response.status == HttpStatus.OK) {
                    setRecargar(!recargar)
                }
            }
        } catch (error) {

        }
    }

    return (
        <>
            <ItemsPagina limite={setLimite} />
            <div className="flex flex-col overflow-x-auto">
                <div className="sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300 rounded-lg shadow-lg">
                                <thead>
                                    <tr className="bg-gray-700 text-white text-left">
                                        <th scope="col" className="px-6 py-4">Cod Medidor</th>
                                        <th scope="col" className="px-6 py-4">N° Medidor</th>
                                        <th scope="col" className="px-6 py-4">Estado</th>
                                        <th scope="col" className="px-6 py-4">Dirección</th>
                                        <th scope="col" className="px-6 py-4">Lecturas pendientes</th>
                                        <th scope="col" className="px-6 py-4">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, i) => (
                                        <tr key={i} className="odd:bg-gray-100 even:bg-white">
                                            <td className="py-2 px-4">{item.codigo}</td>
                                            <td className="py-2 px-4">{item.numeroMedidor}</td>
                                            <td className="py-2 px-4">{item.estado}</td>
                                            <td className="py-2 px-4">{item.direccion}</td>
                                            <td className="py-2 px-4">{item.lecturas.length}</td>
                                            <td className="py-2 px-4">
                                                <button onClick={() => corte(item._id)} className=" p-2 bg-red-500 rounded-2xl  text-white">Realizar corte</button>
                                            </td>
                                        </tr>
                                    ))}
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
