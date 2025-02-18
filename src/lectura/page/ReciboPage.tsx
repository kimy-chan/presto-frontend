import { useParams } from "react-router"
import { Recibo } from "../components/Recibo"

export const ReciboPage = () => {
    const { id } = useParams()
    return (
        <>
            {id && <Recibo id={id} />}
        </>
    )
}
