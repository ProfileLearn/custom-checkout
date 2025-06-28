// app/page.js
import { getPosts } from "@/lib/data";
import PostCard from "@/components/PostCard";

const Home = async () => { // <-- 1. Hacer el componente async
  const posts = await getPosts(); // <-- 2. Usar await

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-5xl font-bold mb-12 text-center">Últimos Posts</h1>
      <div className="w-full max-w-2xl mx-auto space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;