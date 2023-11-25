
import {node} from 'prop-types';
import NavbarPagina from '../components/NavbarPagina';

export const Layout = ({children}) => {
  return (
    <main className='mt-5 py-5'>
        <NavbarPagina/>
        {children}
        </main>
        
  )
}

Layout.propTypes = {
    children: node,
}
