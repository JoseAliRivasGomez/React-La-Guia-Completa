import { Outlet, useOutletContext } from '@remix-run/react'
import { useEffect, useState } from 'react';
import styles from '~/styles/carrito.css'

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export const meta = () => {
  return [
      {
        title: 'GuitarLA - Carrito de Compras',
        description: 'GuitarLA - Venta de guitarras, musica, blog, carrito de compras, tienda'
      }
  ];
};

function Carrito() {

  const {carrito, actualizarCantidad, eliminarGuitarra} = useOutletContext();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if(carrito.length > 0){
      const calculoTotal = carrito.reduce((total, {cantidad, precio}) => total + (cantidad*precio), 0)
      setTotal(calculoTotal)
    }else if(carrito.length === 0){
      setTotal(0)
    }
  }, [carrito]);
  

  return (
    <main className='contenedor'>
      <h1 className='heading'>Carrito de Compras</h1>
      <div className='contenido'>
        <div className='carrito'>
          <h2>Articulos</h2>
          {carrito?.length === 0 ? 'Carrito Vacio' : (
            carrito?.map(({nombre, id, imagen, precio, cantidad}) => (
              <div key={id} className='producto'>
                <div>
                  <img src={imagen} alt={`Imagen del producto ${nombre}`} />
                </div>

                <div>
                  <p className='nombre'>{nombre}</p>
                  <p>Cantidad:</p>
                  <select value={cantidad} className='select' onChange={e => actualizarCantidad({
                    cantidad: +e.target.value,
                    id
                  })}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <p className='precio'>$<span>{precio}</span></p>
                  <p className='subtotal'>Subtotal $<span>{cantidad * precio}</span></p>
                </div>
                <button className='btn_eliminar' type='button' onClick={() => eliminarGuitarra(id)}>X</button>
              </div>
            ))
          )}
        </div>
        <aside className='resumen'>
          <h3>Resumen del Pedido</h3>
          <p>Total a pagar: ${total}</p>
        </aside>
      </div>
      
      <Outlet />
    </main>
  )
}

export default Carrito