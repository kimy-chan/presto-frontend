import { useEffect, useState } from "react";
import { listarMedidor } from "../service/MedidorService";
import { MedidorCliente } from "../interface/medidorCliente";
import { BuscadorMedidor } from "./BuscadorMedidor";
import { BuscadorMedidorClientI } from "../interface/buscadorMedidorCliente";
import { Paginador } from "../../core/components/Paginador";
import { ItemsPagina } from "../../core/components/ItemsPAgina";
import { HttpStatus } from "../../core/enums/httpStatus";

export const ListarMedidor = () => {
    const [data, setData] = useState<MedidorCliente[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [buscador, setBuscador] = useState<BuscadorMedidorClientI>({
        apellidoMaterno: null,
        apellidoPaterno: null,
        ci: null,
        nombre: null,
        numeroMedidor: null
    });
    const [pagina, setPagina] = useState<number>(1)
    const [limite, setLimite] = useState<number>(20)
    const [paginas, setPaginas] = useState<number>(1)

    useEffect(() => {
        listar();
    }, [buscador, limite, pagina]);

    const listar = async () => {
        try {
            const response = await listarMedidor(buscador, limite, pagina);
            if (response.status == HttpStatus.OK) {
                setData(response.data);
                setPaginas(response.paginas)
            }
        } catch (error) {
            console.error("Error al listar medidores:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="overflow-x-auto">
            <BuscadorMedidor onSubmit={setBuscador} />
            <ItemsPagina limite={setLimite} />

            <table className="min-w-full border border-gray-300 rounded-lg shadow-lg">
                <thead>
                    <tr className="bg-gray-700 text-white text-left">
                        <th className="py-2 px-4">Cod Cliente</th>
                        <th className="py-2 px-4">CI</th>
                        <th className="py-2 px-4">Nombre</th>
                        <th className="py-2 px-4">Apellido Paterno</th>
                        <th className="py-2 px-4">Apellido Materno</th>
                        <th className="py-2 px-4">Cod Medidor</th>
                        <th className="py-2 px-4">N° Medidor</th>
                        <th className="py-2 px-4">Estado</th>
                        <th className="py-2 px-4">Dirección</th>
                        <th className="py-2 px-4">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i} className="odd:bg-gray-100 even:bg-white">
                            <td className="py-2 px-4">{item.codigoCliente}</td>
                            <td className="py-2 px-4">{item.ci}</td>
                            <td className="py-2 px-4">{item.nombre}</td>
                            <td className="py-2 px-4">{item.apellidoPaterno}</td>
                            <td className="py-2 px-4">{item.apellidoMaterno}</td>
                            <td className="py-2 px-4">{item.codigo}</td>
                            <td className="py-2 px-4">{item.numeroMedidor}</td>
                            <td className="py-2 px-4">{item.estado}</td>
                            <td className="py-2 px-4">{item.direccion}</td>
                            <td className="py-2 px-4">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded">
                                    Ver
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <Paginador paginaActual={pagina} paginaSeleccionada={setPagina} paginas={paginas} />
        </div>

    );
};
