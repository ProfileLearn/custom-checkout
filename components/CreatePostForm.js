// components/CreatePostForm.js
const CreatePostForm = () => {
  return (
    <form className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" htmlFor="title">
            Título
          </label>
          <input className="appearance-none block w-full bg-gray-800 text-gray-200 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700 focus:border-blue-500" id="title" name="title" type="text" placeholder="El título de tu post" />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" htmlFor="content">
            Contenido
          </label>
          <textarea className="appearance-none block w-full bg-gray-800 text-gray-200 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700 focus:border-blue-500 h-48 resize-none" id="content" name="content" placeholder="Escribe tu post aquí..."></textarea>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Crear Post
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;