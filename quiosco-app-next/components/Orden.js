import Image from "next/image";
import { formatearDinero } from "../helpers";
import { toast } from "react-toastify";
import axios from "axios";


export default function Orden({orden}) {
    const {id, nombre, total, pedido} = orden;

    const completarOrden = async () => {
        try {
            const {data} = await axios.post(`/api/ordenes/${id}`);
            toast.success('Orden Lista');
        } catch (error) {
            // console.log(error);
            toast.error('Error actualizando orden');         
        }
    }
  return (
    <div className="border p-10 space-y-5">
        <h3 className="text-2xl font-bold">Orden: {id}</h3>
        <p className="text-lg font-bold">Cliente: {nombre}</p>
        <div>
            {pedido.map(({id, nombre, imagen, cantidad}) => (
                <div key={id} className="py-3 flex border-b last-of-type:border-0 items-center">
                    <div className="w-32">
                        <Image width={400} height={500} src={`/assets/img/${imagen}.jpg`} alt={`Imagen Platillo ${nombre}`} />
                    </div>
                    <div className="p-5 space-y-2">
                        <h4 className="text-lg font-bold text-amber-500">{nombre}</h4>
                        <p className="text-lg font-bold">Cantidad: {cantidad}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="md:flex md:items-center md: justify-between my-10">
            <p className="mt-5 font-black text-4xl text-amber-500">
                Total a pagar: {formatearDinero(total)}
            </p>
            <button className="bg-indigo-600 hover:bg-indogo-800 text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold rounded-lg" type="button" onClick={() => completarOrden()}>
                Completar Orden
            </button>
        </div>
    </div>
  )
}
