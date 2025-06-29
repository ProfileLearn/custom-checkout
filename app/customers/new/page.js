// app/clientes/nuevo/page.js
import CreateCustomerForm from "@/components/CreateCustomerForm"; // Lo renombraremos en el siguiente paso
import fs from 'fs/promises';
import path from 'path';

const NewCustomerPage = async () => {
  const filePath = path.join(process.cwd(), 'lib', 'customer-form-config.json'); // Apunta al nuevo archivo
  const fileContent = await fs.readFile(filePath, 'utf8');
  const fields = JSON.parse(fileContent);

  return (
    <div className="flex flex-col items-center p-12">
      <h1 className="text-4xl font-bold mb-8">Crear un Nuevo Cliente</h1>
      <CreateCustomerForm fields={fields} />
    </div>
  );
};

export default NewCustomerPage;