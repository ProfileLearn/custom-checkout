import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold">
          <Link href="/" className="hover:text-gray-300">
            Mi Blog con Next.js
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-white hover:text-gray-300">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/acerca" className="text-white hover:text-gray-300">
                Acerca de
              </Link>
            </li>
            <li>
              <Link href="/posts/nuevo" className="text-white hover:text-gray-300">
                Crear Post
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;