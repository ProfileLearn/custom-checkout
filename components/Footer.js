const Footer = () => {
  const currentYear = new Date().getFullYear(); // Obtenemos el año actual dinámicamente

  return (
    <footer className="bg-gray-800 text-gray-400 p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>© {currentYear} Mi Blog con Next.js. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;