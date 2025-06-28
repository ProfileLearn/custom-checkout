// app/posts/nuevo/page.js
import CreatePostForm from "@/components/CreatePostForm";

const NewPostPage = () => {
  return (
    // Usamos la misma estructura de contenedor que en las otras páginas
    <div className="flex flex-col items-center p-12">
      <h1 className="text-4xl font-bold mb-8">Crear un Nuevo Post</h1>
      <CreatePostForm />
    </div>
  );
};

export default NewPostPage;