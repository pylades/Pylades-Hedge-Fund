import { RLink } from '.';

const Navbar = () => (
  <nav className='space-x-3 border-dashed border-t border-b py-3 my-6 flex justify-end'>
    <RLink text='/' href='/' />
    <RLink text='metrics' href='/metrics' />
    <RLink text='memorandum' href='/memorandum' />
    <RLink text='partners' href='/partners' />
    <RLink text='about' href='/about' />
  </nav>
);

export { Navbar };
