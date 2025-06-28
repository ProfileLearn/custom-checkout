import { posts } from '@/lib/data';
import { notFound } from 'next/navigation';

// Parte 1: Sigue siendo esencial para la optimización y para informar a Next.js.
export async function generateStaticParams() {
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

// Parte 2: AÑADIMOS ASYNC DE NUEVO. Esta es la clave que faltaba.
const PostDetailPage = async ({ params }) => {
  const resolvedParams = await params;
  const postId = parseInt(resolvedParams.id, 10);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-12 md:p-24 bg-gray-900 text-white">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{post.title}</h1>
        <p className="text-lg text-gray-300">{post.content}</p>
      </div>
    </div>
  );
};

export default PostDetailPage;