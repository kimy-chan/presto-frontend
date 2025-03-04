import { useEffect, useState } from "react";
import { listarMedidor } from "../service/MedidorService";
import { MedidorCliente } from "../interface/medidorCliente";
import { BuscadorMedidor } from "./BuscadorMedidor";
import { BuscadorMedidorClientI } from "../interface/buscadorMedidorCliente";
import { Paginador } from "../../core/components/Paginador";
import { ItemsPagina } from "../../core/components/ItemsPAgina";
import { HttpStatus } from "../../core/enums/httpStatus";
import { MdDelete } from "react-icons/md";
import { FaBookReader, FaEdit } from "react-icons/fa";
import { EditarMedidorModal } from "../modal/EditarMedidorModal";

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

    const [medidor, setMedidor] = useState<string>()

    const [isOpen, setIsOpen] = useState(false);


    const closeModal = () => setIsOpen(false);

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

    const medidorId = (medidor: string) => {
        setMedidor(medidor)
        setIsOpen(true)
    }
    return (
        <>
            <BuscadorMedidor onSubmit={setBuscador} />
            <ItemsPagina limite={setLimite} />
            <div className="flex flex-col overflow-x-auto">
                <div className="sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300 rounded-lg shadow-lg">
                                <thead>
                                    <tr className="bg-gray-700 text-white text-left">
                                        <th scope="col" className="px-6 py-4">Cod Cliente</th>
                                        <th scope="col" className="px-6 py-4">CI</th>
                                        <th scope="col" className="px-6 py-4">Nombre</th>
                                        <th scope="col" className="px-6 py-4">Apellido Paterno</th>
                                        <th scope="col" className="px-6 py-4">Apellido Materno</th>
                                        <th scope="col" className="px-6 py-4">Cod Medidor</th>
                                        <th scope="col" className="px-6 py-4">N° Medidor</th>
                                        <th scope="col" className="px-6 py-4">Estado</th>
                                        <th scope="col" className="px-6 py-4">Dirección</th>
                                        <th scope="col" className="px-6 py-4">Acción</th>
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
                                                <button className="text-black-500 text-2xl px-3">
                                                    <FaBookReader />
                                                </button>

                                                <button className=" text-red-500 text-2xl px-3 py-1 rounded">
                                                    <MdDelete />
                                                </button>
                                                <button onClick={() => medidorId(item._id)} className=" text-blue-500 text-2xl px-3 py-1 rounded">
                                                    <FaEdit />
                                                </button>
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
            {isOpen && medidor && <EditarMedidorModal closeModal={closeModal} isOpen={isOpen} medidor={medidor} />}
        </>
    );
};
