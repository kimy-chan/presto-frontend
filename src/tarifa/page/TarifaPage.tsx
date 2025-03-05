import { ListarTarifas } from "../components/ListarTarifas";
import { CrearTarifa } from "../modal/CrearTarifa";

export const TarifaPage = () => {
  return <div>
    <CrearTarifa />
    <ListarTarifas />
  </div>;
};
