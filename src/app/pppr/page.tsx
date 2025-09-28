import { Suspense } from 'react';
import { User, Post } from '@/types/api';
import axios from 'axios';

async function getStaticUsers(): Promise<User[]> {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data.slice(0, 3);
}

async function DynamicPosts() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts: Post[] = response.data;

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <h3 className="text-xl font-bold text-yellow-800 mb-4">
        🔄 Динамический контент (загружается при каждом запросе)
      </h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-md p-4 border">
            <h4 className="font-semibold text-gray-800 capitalize">{post.title}</h4>
            <p className="text-gray-600 text-sm mt-2">{post.body}</p>
            <p className="text-xs text-yellow-600 mt-2">Post ID: {post.id} | User: {post.userId}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-yellow-700 mt-4">
        Время загрузки: {new Date().toLocaleTimeString('ru-RU')}
      </p>
    </div>
  );
}

function DynamicPostsLoading() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <h3 className="text-xl font-bold text-yellow-800 mb-4">
        🔄 Динамический контент (загружается...)
      </h3>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white rounded-md p-4 border animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function PPPRPage() {
  const staticUsers = await getStaticUsers();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          PPPR Demo
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Partial Pre-Rendering
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Эта страница демонстрирует PPPR - новую технологию Next.js 15, которая позволяет
          комбинировать статический и динамический контент на одной странице. Статический
          контент отображается мгновенно, а динамический загружается асинхронно.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            ⚡ Статический контент (предварительно отрендерен)
          </h3>
          <div className="space-y-4">
            {staticUsers.map((user) => (
              <div key={user.id} className="bg-white rounded-md p-4 border">
                <h4 className="font-semibold text-gray-800">{user.name}</h4>
                <p className="text-gray-600 text-sm">@{user.username}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
                <p className="text-xs text-green-600 mt-2">User ID: {user.id}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-green-700 mt-4">
            ✅ Отображается мгновенно (статически сгенерирован)
          </p>
        </div>

        <Suspense fallback={<DynamicPostsLoading />}>
          <DynamicPosts />
        </Suspense>
      </div>
    </div>
  );
}
