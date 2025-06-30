// components/Header.js

import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-background p-4 border-b border-border-color">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-foreground text-xl font-semibold">
          <Link href="/" className="hover:text-primary">
            Gestor de Clientes
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/customers/new" className="text-foreground hover:text-primary">
                Nuevo Cliente
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;