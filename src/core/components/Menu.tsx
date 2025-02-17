import { useState, ReactNode } from "react";
import { Link } from "react-router";
import { FaBars, FaHome, FaCog, FaUsers, FaUserTie } from "react-icons/fa";
import { LiaTachometerAltSolid } from "react-icons/lia";
import { MdOutlinePayments } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { FcReadingEbook } from "react-icons/fc";
import { IoReaderOutline } from "react-icons/io5";
import { FaMoneyBills } from "react-icons/fa6";

export const Menu = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    medidores: false,
    pagos: false,
    gastos: false,
    lecturas: false
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="flex h-screen">
      <div
        className={`bg-gray-800 text-white transition-all ${isOpen ? "w-64" : "w-16"
          } flex flex-col p-4`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-6 text-white focus:outline-none"
        >
          <FaBars size={24} />
        </button>

        <nav className="flex-1">
          <ul>
            <li className="mb-4">
              <Link
                to="/"
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
              >
                <FaHome size={24} />
                {isOpen && <span>Inicio</span>}
              </Link>
            </li>

            <li className="mb-4">
              <Link
                to="/clientes"
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
              >
                <FaUsers size={24} />
                {isOpen && <span>Clientes</span>}
              </Link>
            </li>

            {/* Medidores Section */}
            <li>
              <button
                onClick={() => toggleSection("medidores")}
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700"
              >
                <LiaTachometerAltSolid size={24} />
                {isOpen && <span>Medidores</span>}
              </button>
              {openSections.medidores && (
                <ul className="ml-6">
                  <li>
                    <Link
                      to="/medidor"
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
                    >
                      {isOpen && <span>Ver Medidores</span>}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/medidor/crear"
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
                    >
                      {isOpen && <span>Registrar Medidor</span>}
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Pagos y Tarifas Section */}
            <li>
              <button
                onClick={() => toggleSection("pagos")}
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700"
              >
                <MdOutlinePayments size={24} />
                {isOpen && <span>Pagos y Tarifas</span>}
              </button>
              {openSections.pagos && (
                <ul className="ml-6">

                  <li>
                    <Link
                      to="/tarifas"
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
                    >
                      <GrMoney size={24} />
                      {isOpen && <span>Tarifas</span>}
                    </Link>
                  </li>


                  <li>
                    <Link
                      to="/tarifas"
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
                    >
                      <GrMoney size={24} />
                      {isOpen && <span>Pagos</span>}
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Gastos Section */}
            <li>
              <button
                onClick={() => toggleSection("gastos")}
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700"
              >
                <FaMoneyBills size={24} />
                {isOpen && <span>Gastos</span>}
              </button>
              {openSections.gastos && (
                <ul className="ml-6">
                  <li>
                    <Link
                      to="/categorias/gasto"
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
                    >
                      {isOpen && <span>Categoría de Gasto</span>}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/gastos"
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
                    >
                      {isOpen && <span>Lista de Gastos</span>}
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <button
                onClick={() => toggleSection("lecturas")}
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700"
              >
                <IoReaderOutline size={24} />
                {isOpen && <span>Lecturas</span>}
              </button>
              {openSections.lecturas && (
                <ul className="ml-6">
                  <li>
                    <Link
                      to="/lectura/registrar"
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
                    >
                      <FcReadingEbook size={24} />
                      {isOpen && <span>Lecturas</span>}
                    </Link>
                  </li>
                </ul>
              )}
            </li>


            <li className="mt-4">
              <Link
                to="/usuarios"
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
              >
                <FaUserTie size={24} />
                {isOpen && <span>Usuarios</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 p-6 bg-gray-100">{children}</div>
    </div>
  );
};
