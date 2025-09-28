'use client';

import { useState } from 'react';
import Link from 'next/link';
import Modal from '@/components/Modal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderingTypes = [
    {
      name: 'SSR',
      title: 'Server-Side Rendering',
      description: 'Данные загружаются на сервере для каждого запроса',
      href: '/ssr',
      color: 'bg-blue-500'
    },
    {
      name: 'SSG',
      title: 'Static Site Generation',
      description: 'Страница генерируется во время сборки',
      href: '/ssg',
      color: 'bg-green-500'
    },
    {
      name: 'CSR',
      title: 'Client-Side Rendering',
      description: 'Данные загружаются на клиенте',
      href: '/csr',
      color: 'bg-yellow-500'
    },
    {
      name: 'ISR',
      title: 'Incremental Static Regeneration',
      description: 'Страница ререндерится с заданным интервалом',
      href: '/isr',
      color: 'bg-purple-500'
    },
    {
      name: 'PPPR',
      title: 'Partial Pre-Rendering',
      description: 'Комбинация статического и динамического контента',
      href: '/pppr',
      color: 'bg-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Next.js Test Application
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Демонстрация различных типов рендеринга и функциональности
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Открыть модальное окно
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderingTypes.map((type) => (
            <Link
              key={type.name}
              href={type.href}
              className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className={`${type.color} h-3`}></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {type.name}
                </h3>
                <h4 className="text-lg font-medium text-gray-700 mb-3">
                  {type.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {type.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Функциональность приложения
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
              4 страницы с разными типами рендеринга (SSR, SSG, CSR, ISR)
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
              Интеграция с JSONPlaceholder API
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
              Модальное окно с формой отправки данных
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
              POST-запросы и WebSocket подключение
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
              Адаптивный дизайн с Tailwind CSS
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
              SCSS модули и современные техники стилизации
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
              CSS-in-JS, Glass Morphism, градиенты и анимации
            </li>
          </ul>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
