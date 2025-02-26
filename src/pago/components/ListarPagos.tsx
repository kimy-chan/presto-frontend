import { useEffect, useState } from "react";
import { BuscadorPagos } from "./BuscadorPagos";
import { listarTodosLosPagos } from "../service/pagoService";
import { ListarPagosI } from "../interface/listarPagos";
import { BuscadorPagosI } from "../interface/buscadorPagos";
import { ItemsPagina } from "../../core/components/ItemsPAgina";
import { Paginador } from "../../core/components/Paginador";

export const ListarPagos = () => {
    const [data, setData] = useState<ListarPagosI[]>([]);
    const [buscador, setBuscador] = useState<BuscadorPagosI>({
        ci: null,
        numeroMedidor: null,
        apellidoMaterno: null,
        apellidoPaterno: null,
        nombre: null,
        fechaFin: null,
        fechaInicio: null
    });
    const [pagina, setPagina] = useState<number>(1)
    const [limite, setLimite] = useState<number>(20)
    const [paginas, setPaginas] = useState<number>(1)
    useEffect(() => {
        listarPagos()
    }, [buscador, limite, pagina])

    const listarPagos = async () => {
        try {
            const response = await listarTodosLosPagos(buscador, limite, pagina)
            setData(response)
        } catch (error) {
            console.log(error);

        }
    }
    return (
        < >
            <BuscadorPagos onSubmit={setBuscador} />
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
                                        <th className="py-2 px-4">Cod Cliente</th>
                                        <th className="py-2 px-4 hidden md:table-cell">CI</th>
                                        <th className="py-2 px-4">Nombre</th>
                                        <th className="py-2 px-4 hidden md:table-cell">Apellidos</th>

                                        <th className="py-2 px-4 hidden md:table-cell">Cod Medidor</th>
                                        <th className="py-2 px-4 hidden md:table-cell">N° Medidor</th>


                                        <th className="py-2 px-4 hidden md:table-cell">Lect. Ant</th>
                                        <th className="py-2 px-4 hidden md:table-cell">Lect. Act</th>
                                        <th className="py-2 px-4 hidden md:table-cell">Cons (m³)</th>

                                        <th className="py-2 px-4 hidden md:table-cell">Monto</th>
                                        <th className="py-2 px-4 hidden md:table-cell">Pagado</th>

                                        <th className="py-2 px-4 hidden md:table-cell">Mes</th>
                                        <th className="py-2 px-4">Estado</th>
                                        <th className="py-2 px-4 hidden md:table-cell">Recibo</th>
                                        <th className="py-2 px-4 hidden md:table-cell">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <th className="py-2 px-4">{item.codigoCliente}</th>
                                            <th className="py-2 px-4 hidden md:table-cell">{item.ci}</th>
                                            <th className="py-2 px-4">{item.nombre}</th>
                                            <th className="py-2 px-4 hidden md:table-cell">{item.apellidoPaterno} {item.apellidoMaterno}</th>

                                            <th className="py-2 px-4 hidden md:table-cell">{item.codigoMedidor}</th>
                                            <th className="py-2 px-4 hidden md:table-cell">{item.numeroMedidor}</th>


                                            <th className="py-2 px-4 hidden md:table-cell">{item.lecturaAnterior}</th>
                                            <th className="py-2 px-4 hidden md:table-cell">{item.lecturaActual}</th>
                                            <th className="py-2 px-4 hidden md:table-cell">{item.consumoTotal}</th>

                                            <th className="py-2 px-4 hidden md:table-cell">{item.costoApagar}</th>
                                            <th className="py-2 px-4 hidden md:table-cell">{item.costoPagado}</th>
                                            <th className="py-2 px-4 hidden md:table-cell">{item.mes}</th>
                                            <th className="py-2 px-4">{item.estado}</th>

                                            <th className="py-2 px-4 hidden md:table-cell">{item.numeroPago}</th>
                                            <th className="py-2 px-4 hidden md:table-cell">{item.fecha}</th>
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
    );
}
