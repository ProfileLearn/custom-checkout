import Link from 'next/link';

const PostCard = ({ post }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-2">
        <Link href={`/posts/${post.id}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-400">{post.content}</p>
    </div>
  );
};

export default PostCard;