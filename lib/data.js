// lib/data.js
let posts = [
  {
    id: 1,
    title: "Entendiendo los Server Components",
    content: "Los Server Components son una nueva característica de React que Next.js utiliza para renderizar UI en el servidor, mejorando el rendimiento y la carga inicial."
  },
  {
    id: 2,
    title: "Routing Basado en Archivos",
    content: "Next.js simplifica el enrutamiento. Cada carpeta dentro de 'app' se convierte en un segmento de la URL, haciendo la navegación intuitiva y fácil de gestionar."
  },
  {
    id: 3,
    title: "Estilizando con Tailwind CSS",
    content: "Tailwind CSS es un framework 'utility-first' que nos permite construir diseños complejos directamente en nuestro JSX, sin salir de nuestro archivo HTML/JS."
  }
];


// Función para obtener todos los posts (AHORA ASÍNCRONA)
export const getPosts = async () => {
  
  return posts;
};

// Función para añadir un nuevo post (puede ser síncrona, pero la hacemos async por consistencia)
export const addPost = async (post) => {
  
  posts.push(post);
};

// Función para obtener un post por ID (AHORA ASÍNCRONA)
export const getPostById = async (id) => {
  
  const postId = parseInt(id, 10);
  return posts.find((p) => p.id === postId);
};