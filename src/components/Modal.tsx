'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ModalProps, ModalFormData } from '@/types/components';

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState<ModalFormData>({ text: '', file: null });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wsConnected, setWsConnected] = useState(false);
  const [wsMessages, setWsMessages] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (isOpen) {
      connectWebSocket();
    } else {
      disconnectWebSocket();
      setFormData({ text: '', file: null });
      setSuccess(false);
      setError(null);
      setWsMessages([]);
    }

    return () => {
      disconnectWebSocket();
    };
  }, [isOpen]);

  const connectWebSocket = () => {
    try {
      wsRef.current = new WebSocket('wss://echo.websocket.org/');

      wsRef.current.onopen = () => {
        setWsConnected(true);
        addWsMessage('✅ WebSocket подключен');
      };

      wsRef.current.onmessage = (event) => {
        addWsMessage(`📩 Получено: ${event.data}`);
      };

      wsRef.current.onclose = () => {
        setWsConnected(false);
        addWsMessage('❌ WebSocket отключен');
      };

      wsRef.current.onerror = () => {
        setWsConnected(false);
        addWsMessage('⚠️ Ошибка WebSocket');
      };
    } catch (err) {
      addWsMessage('⚠️ Не удалось подключиться к WebSocket');
    }
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setWsConnected(false);
  };

  const addWsMessage = (message: string) => {
    setWsMessages(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const sendWebSocketMessage = (message: string) => {
    if (wsRef.current && wsConnected) {
      wsRef.current.send(message);
      addWsMessage(`📤 Отправлено: ${message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.text.trim()) {
      setError('Пожалуйста, введите текст');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const submitData = new FormData();
      submitData.append('text', formData.text);
      if (formData.file) {
        submitData.append('file', formData.file);
      }
      submitData.append('timestamp', new Date().toISOString());

      const response = await axios.post('/api/submit', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (wsConnected) {
        sendWebSocketMessage(`Форма отправлена: ${formData.text}`);
      }

      setSuccess(true);
      console.log('Ответ сервера:', response.data);

    } catch (err) {
      setError('Ошибка при отправке данных');
      console.error('Ошибка:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, file }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            Модальное окно с формой
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                Данные успешно отправлены!
              </h3>
              <p className="text-gray-600 mb-4">
                POST-запрос выполнен успешно
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Отправить еще раз
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
                  Текстовое поле *
                </label>
                <input
                  type="text"
                  id="text"
                  value={formData.text}
                  onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Введите текст..."
                  required
                />
              </div>

              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                  Файл
                </label>
                <input
                  type="file"
                  id="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formData.file && (
                  <p className="text-sm text-gray-600 mt-2">
                    Выбран файл: {formData.file.name} ({(formData.file.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  {loading ? 'Отправка...' : 'Отправить POST-запрос'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                WebSocket статус
              </h3>
              <div className={`flex items-center gap-2 ${wsConnected ? 'text-green-600' : 'text-red-600'}`}>
                <div className={`w-3 h-3 rounded-full ${wsConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  {wsConnected ? 'Подключен' : 'Отключен'}
                </span>
              </div>
            </div>

            {wsMessages.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Сообщения:</h4>
                <div className="space-y-1 text-sm text-gray-600 max-h-32 overflow-y-auto">
                  {wsMessages.map((message, index) => (
                    <div key={index} className="font-mono text-xs">
                      {message}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
