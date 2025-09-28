import axios from 'axios';
import { Post } from '@/types/api';

async function getPosts(): Promise<Post[]> {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data.slice(0, 10);
}

export default async function SSGPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">SSG Page</h1>
      <p className="text-gray-600 mb-6 text-center">
        Static Site Generation - страница генерируется во время сборки
      </p>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md p-6 border">
            <h2 className="text-2xl font-semibold mb-3 capitalize">{post.title}</h2>
            <p className="text-gray-700 leading-relaxed">{post.body}</p>
            <p className="text-sm text-gray-500 mt-3">Post ID: {post.id} | User ID: {post.userId}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export const revalidate = false;