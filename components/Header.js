// components/Header.js
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold">
          <Link href="/" className="hover:text-gray-300">
            Gestor de Clientes
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/customers/new" className="text-white hover:text-gray-300">
                Crear Cliente
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;