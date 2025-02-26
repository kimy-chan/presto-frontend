import { ReactNode, useState } from 'react';
import { FaBars, FaHome, FaTimes, FaUsers, FaUserTie } from 'react-icons/fa'; // Importamos los íconos
import { FaMoneyBills } from 'react-icons/fa6';
import { FcReadingEbook } from 'react-icons/fc';
import { GrMoney } from 'react-icons/gr';
import { IoReaderOutline } from 'react-icons/io5';
import { LiaTachometerAltSolid } from 'react-icons/lia';
import { MdOutlinePayments } from 'react-icons/md';
import { Link } from 'react-router';

export const Menu = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    medidores: false,
    pagos: false,
    gastos: false,
    lecturas: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`transition-all ${open ? 'w-64' : 'w-0'} bg-gray-800 text-white h-auto  `}>
        {/* Mostrar solo el ícono de hamburguesa cuando el sidebar está cerrado */}
        <div className={`flex justify-between items-center p-4 ${open ? 'block' : 'absolute top-4 left-4'}`}>
          <button onClick={() => setOpen(!open)} className="text-white focus:outline-none">
            {/* Ícono de hamburguesa */}
            {!open ? (
              <FaBars className="w-6 h-6  text-black" />
            ) : (
              <FaTimes className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Contenido del sidebar, solo visible cuando open es true */}
        {open && (
          <div className="p-4">
            <ul>
              <li className="mb-4">
                <Link to="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                  <FaHome size={24} />
                  {isOpen && <span>Inicio</span>}
                </Link>
              </li>

              <li className="mb-4">
                <Link to="/clientes" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                  <FaUsers size={24} />
                  {isOpen && <span>Clientes</span>}
                </Link>
              </li>

              {/* Sección de Medidores */}
              <li>
                <button onClick={() => toggleSection("medidores")} className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700">
                  <LiaTachometerAltSolid size={24} />
                  {isOpen && <span>Medidores</span>}
                </button>
                {openSections.medidores && (
                  <ul className="ml-6">
                    <li>
                      <Link to="/medidor" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        {isOpen && <span>Ver Medidores</span>}
                      </Link>
                    </li>
                    <li>
                      <Link to="/medidor/crear" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        {isOpen && <span>Registrar Medidor</span>}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Sección de Pagos y Tarifas */}
              <li>
                <button onClick={() => toggleSection("pagos")} className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700">
                  <MdOutlinePayments size={24} />
                  {isOpen && <span>Pagos y Tarifas</span>}
                </button>
                {openSections.pagos && (
                  <ul className="ml-6">
                    <li>
                      <Link to="/tarifas" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        <GrMoney size={24} />
                        {isOpen && <span>Tarifas</span>}
                      </Link>
                    </li>
                    <li>
                      <Link to="/realizar/pago" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        <GrMoney size={24} />
                        {isOpen && <span>Realizar pagos</span>}
                      </Link>
                    </li>
                    <li>
                      <Link to="/listar/Pagos" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        <GrMoney size={24} />
                        {isOpen && <span>Listar pagos</span>}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Sección de Gastos */}
              <li>
                <button onClick={() => toggleSection("gastos")} className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700">
                  <FaMoneyBills size={24} />
                  {isOpen && <span>Gastos</span>}
                </button>
                {openSections.gastos && (
                  <ul className="ml-6">
                    <li>
                      <Link to="/categorias/gasto" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        {isOpen && <span>Categoría de Gasto</span>}
                      </Link>
                    </li>
                    <li>
                      <Link to="/gastos" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        {isOpen && <span>Lista de Gastos</span>}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Sección de Lecturas */}
              <li>
                <button onClick={() => toggleSection("lecturas")} className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700">
                  <IoReaderOutline size={24} />
                  {isOpen && <span>Lecturas</span>}
                </button>
                {openSections.lecturas && (
                  <ul className="ml-6">
                    <li>
                      <Link to="/lectura/registrar" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        <FcReadingEbook size={24} />
                        {isOpen && <span>Realizar Lecturas</span>}
                      </Link>
                    </li>
                    <li>
                      <Link to="/listar/lectura" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        <FcReadingEbook size={24} />
                        {isOpen && <span>Listar Lecturas</span>}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Usuarios */}
              <li className="mt-4">
                <Link to="/usuarios" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                  <FaUserTie size={24} />
                  {isOpen && <span>Usuarios</span>}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-6">
        <div>{children}</div>
      </div>
    </div>
  );
};
