// app/customers/new/page.js
import CreateCustomerForm from "@/components/CreateCustomerForm";
import fs from 'fs/promises';
import path from 'path';

const NewCustomerPage = async ({ searchParams }) => {
  const params = await searchParams;
  const tenantId = params?.tenant || 'default';

  let filePath = path.join(process.cwd(), 'config', 'tenants', `${tenantId}.json`);
  let fileContent;

  try {
    fileContent = await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.warn(`Configuración para el tenant "${tenantId}" no encontrada. Usando default.`);
    filePath = path.join(process.cwd(), 'config', 'tenants', 'default.json');
    fileContent = await fs.readFile(filePath, 'utf8');
  }

  const fields = JSON.parse(fileContent);

  return (
    <div className="flex flex-col items-center p-12">
      <h1 className="text-4xl font-bold mb-8">Crear un Nuevo Cliente</h1>
      <p className="text-sm text-foreground-light mb-4">Configuración: {tenantId}</p>
      <CreateCustomerForm fields={fields} />
    </div>
  );
};

export default NewCustomerPage;