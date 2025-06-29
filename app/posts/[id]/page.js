// app/posts/[id]/page.js
import { getPostById, getPosts } from '@/lib/data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

const PostDetailPage = async ({ params }) => {
  // PASO 1: Resolver el objeto params. ESTA ES LA LÍNEA QUE ARREGLA EL ERROR.
  const resolvedParams = await params;

  // PASO 2: Usar el ID resuelto para llamar a nuestra función de datos asíncrona.
  const post = await getPostById(resolvedParams.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4">
      <div className="w-full max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">{post.title}</h1>
        <p className="text-md text-gray-400">{post.content}</p>
      </div>
    </div>
  );
};

export default PostDetailPage;