import { BrowserRouter as Router, Routes, Route } from "react-router"
import { tarifaRouter } from "../../tarifa/router/tarifaRouter"
import { RouterI } from "../interface/router"
import { clienteRouter } from "../../cliente/routes/clienteRouter";
import { Menu } from "../components/Menu";
import { medidorRouter } from "../../medidor/router/medidorRouter";
import { gastoRouter } from "../../gasto/router/gastoRouter";
import { categoriaGastoRouter } from "../../categoriaGasto/router/CategoriaGastoRouter";
import { lecturaRouter } from "../../lectura/router/lecturaRouter";
import { pagoRouter } from "../../pago/router/pagoRouter";



const RouterApp = ({ router }: { router: RouterI[] }) => {

  return (
    <>
      <Routes>
        {router.map((item, index) => (
          <Route key={index} path={item.path} element={<item.element />} />
        ))}
      </Routes>
    </>
  );
};

export const RouterIndex = () => {
  return (

    <Router>
      <Menu>
        <RouterApp router={tarifaRouter} />
        <RouterApp router={clienteRouter} />
        <RouterApp router={medidorRouter} />
        <RouterApp router={gastoRouter} />
        <RouterApp router={categoriaGastoRouter} />
        <RouterApp router={lecturaRouter} />
        <RouterApp router={pagoRouter} />
      </Menu>
    </Router>

  );
};
