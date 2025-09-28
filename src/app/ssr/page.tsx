import axios from 'axios';
import { User } from '@/types/api';

async function getUsers(): Promise<User[]> {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
}

export default async function SSRPage() {
  const users = await getUsers();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">SSR Page</h1>
      <p className="text-gray-600 mb-6 text-center">
        Server-Side Rendering - данные загружаются на сервере для каждого запроса
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-6 border">
            <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
            <p className="text-gray-600 mb-1">@{user.username}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}