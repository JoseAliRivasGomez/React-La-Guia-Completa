import { Outlet, useOutletContext } from '@remix-run/react'
import styles from '~/styles/blog.css'

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

function Blog() {
  return (
    <main className="contenedor">
      <Outlet
            context={useOutletContext()} 
          />
    </main>
  )
}

export default Blog