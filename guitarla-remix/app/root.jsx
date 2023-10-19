import { cssBundleHref } from "@remix-run/css-bundle";
// import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useRouteError,
  isRouteErrorResponse,
  
} from "@remix-run/react";
import styles from '~/styles/index.css'
import Header from '~/components/header'
import Footer from '~/components/footer'
import { useEffect, useState } from "react";

// export const links: LinksFunction = () => [
//   ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
// ];

export const meta = () => {
    return [
        {
            charset: 'utf-8',
            title: 'GuitarLA - Remix',
            viewport: "width=device-width,initial-scale=1"
        }
    ];
};

export const links = () => [
    {
        rel: 'stylesheet',
        href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
    },
    {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
    },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin : "true"
    }, 
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
    },
    {
        rel: 'stylesheet',
        href: styles
    }
];


export default function App() {

    // const carritoFromLS = typeof window !== 'undefined' ? JSON.parse(localStorage?.getItem('carrito')) ?? [] : [];
    const [carrito, setCarrito] = useState([]);

    // useEffect para cargar el state con info del LS
    useEffect(() => {
        const carritoLS = JSON.parse(localStorage.getItem('carrito')) ?? [];
        setCarrito(carritoLS);
    }, []);

    // UseEffect para grabar en el LS
    useEffect(() => {
        if (carrito?.length === 0) return;
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const agregarCarrito = (guitarra) => {
        if(carrito.some((guitarraState) => guitarraState.id === guitarra.id)){
            const carritoUpdated = carrito.map(guitarraState => {
                if(guitarraState.id === guitarra.id){
                    guitarraState.cantidad = guitarra.cantidad
                }
                return guitarraState
            })
            setCarrito(carritoUpdated)
        }else{
            setCarrito([...carrito, guitarra])
        }
    }

    const actualizarCantidad = (guitarra) => {
        const carritoUpdated = carrito.map(guitarraState => {
            if(guitarraState.id === guitarra.id){
                guitarraState.cantidad = guitarra.cantidad
            }
            return guitarraState
        })
        setCarrito(carritoUpdated)
    }

    const eliminarGuitarra = (id) => {
        const carritoUpdated = carrito.filter(guitarraState => guitarraState.id != id)
        carritoUpdated.length === 0 && localStorage.setItem('carrito', '[]');
        setCarrito(carritoUpdated)
    }

  return(
      <Document>
          <Outlet 
            context={{
                carrito,
                agregarCarrito,
                actualizarCantidad,
                eliminarGuitarra,
            }} 
          />
      </Document>
  )
}

function Document({children}) {
  return (
      <html lang="es">
          <head>
              <Meta />
              <Links />
          </head>
          <body>
              <Header />
              {children}
              <Footer />
              <Scripts />
              <LiveReload />
          </body>
      </html>
  )
}

/** Manejo de errores */
export function ErrorBoundary() {
    const error = useRouteError()
    if(isRouteErrorResponse(error)){
        return (
            <Document>
                <p className='error'>{error.status } {error.statusText}</p>
                <Link className='error-enlace' to="/">Tal vez quieras volver a a la página principal</Link>
            </Document>
        )
    }
}