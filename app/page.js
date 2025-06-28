import { posts } from "@/lib/data";
import PostCard from "@/components/PostCard";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center p-12 md:p-24 bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-12">Últimos Posts</h1>
      <div className="w-full max-w-2xl space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;