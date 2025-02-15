import { ReactNode, useState } from "react";
import { FaHome, FaCog, FaBars, FaUsers, FaUserTie } from "react-icons/fa";
import { FcReadingEbook } from "react-icons/fc";
import { GrMoney } from "react-icons/gr";
import { LiaTachometerAltSolid } from "react-icons/lia";
import { MdOutlinePayments } from "react-icons/md";
import { Link } from "react-router";

export const Menu = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);

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
              <a
                href="#"
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
              >
                <FaHome size={24} />
                {isOpen && <span>Inicio</span>}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
              >
                <FaCog size={24} />
                {isOpen && <span>Configuración</span>}
              </a>
            </li>
            <li>
              <Link
                to='/clientes'
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
              >
                <FaUsers size={24} />
                {isOpen && <span>Clientes</span>}
              </Link>
            </li>
            <li>
              <Link
                to='/medidor'
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
              >
                <LiaTachometerAltSolid size={24} />
                {isOpen && <span>Medidores</span>}
              </Link>
            </li>
            <li>
              <Link
                to='/medidor/crear'
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
              >
                <LiaTachometerAltSolid size={24} />
                {isOpen && <span>Registrar Medidor</span>}
              </Link>
            </li>
            <li>
              <Link
                to='/lectura/registrar'
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
              >
                <FcReadingEbook size={24} />
                {isOpen && <span>Lecturas</span>}
              </Link>
            </li>

            <li>
              <Link
                to='/medidor'
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
              >
                <MdOutlinePayments size={24} />
                {isOpen && <span>Pagos</span>}
              </Link>
            </li>


            <li>
              <Link
                to='/tarifas'
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
              >
                <GrMoney size={24} />
                {isOpen && <span>Tarifas</span>}
              </Link>
            </li>

            <li>
              <Link
                to='/categorias/gasto'
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
              >
                <GrMoney size={24} />
                {isOpen && <span>Gasto categoria</span>}
              </Link>
            </li>

            <li>
              <Link
                to='/gastos'
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
              >
                <GrMoney size={24} />
                {isOpen && <span>Gastos</span>}
              </Link>
            </li>
            <li>
              <Link
                to='/medidor'
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
