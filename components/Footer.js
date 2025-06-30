// components/Footer.js

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface text-foreground-light p-4 mt-auto border-t border-border-color">
      <div className="container mx-auto text-center">
        <p>© {currentYear} Gestor de Clientes. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;