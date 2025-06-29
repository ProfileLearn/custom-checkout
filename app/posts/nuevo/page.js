// app/posts/nuevo/page.js
import CreatePostForm from "@/components/CreatePostForm";
import fs from 'fs/promises'; // Módulo de Node para leer archivos (versión de promesas)
import path from 'path'; // Módulo de Node para manejar rutas de archivos

const NewPostPage = async () => {
  // 1. Construir la ruta al archivo de forma segura
  // process.cwd() nos da el directorio raíz del proyecto
  const filePath = path.join(process.cwd(), 'lib', 'form-config.json');

  // 2. Leer el contenido del archivo desde el servidor
  const fileContent = await fs.readFile(filePath, 'utf8');

  // 3. Parsear el contenido JSON a un objeto de JavaScript
  const fields = JSON.parse(fileContent);

  return (
    <div className="flex flex-col items-center p-12">
      <h1 className="text-4xl font-bold mb-8">Crear un Nuevo Post</h1>
      <CreatePostForm fields={fields} />
    </div>
  );
};

export default NewPostPage;