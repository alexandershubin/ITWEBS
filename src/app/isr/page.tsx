import axios from 'axios';
import styles from '@/styles/modules/Card.module.scss';
import buttonStyles from '@/styles/modules/Button.module.scss';
import { Album } from '@/types/api';

async function getAlbums(): Promise<Album[]> {
  const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
  return response.data.slice(0, 12);
}

export default async function ISRPage() {
  const albums = await getAlbums();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className={`${styles.cardHeader} text-center`}>
          <span className={`${styles.title} ${styles.large}`}>ISR Page</span>
        </h1>
        <p className="text-gray-600 mb-6">
          Incremental Static Regeneration - страница ререндерится каждые 60 секунд
        </p>
        <div className="text-center text-sm text-gray-500 mb-8">
          Последнее обновление: {new Date().toLocaleString('ru-RU')}
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">
          CSS Modules + SCSS (альбомы с продвинутыми стилями)
        </h2>
        <div className={`${styles.cardGrid}`}>
          {albums.slice(0, 6).map((album) => (
            <div
              key={album.id}
              className={`${styles.card} ${styles.elevated} ${styles.animated} ${styles.cardItem}`}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.title}>{album.title}</h3>
                <p className={styles.subtitle}>Альбом #{album.id}</p>
              </div>
              <div className={styles.cardContent}>
                <p>Этот альбом принадлежит пользователю {album.userId}</p>
              </div>
              <div className={styles.cardFooter}>
                <button className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.small}`}>
                  Открыть
                </button>
                <button className={`${buttonStyles.button} ${buttonStyles.outline} ${buttonStyles.small}`}>
                  Поделиться
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Градиентные карточки (SCSS миксины)
        </h2>
        <div className={`${styles.cardGrid}`}>
          {albums.slice(6, 9).map((album) => (
            <div
              key={album.id}
              className={`${styles.card} ${styles.gradient} ${styles.animated} ${styles.cardItem}`}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.title} style={{ color: 'white' }}>{album.title}</h3>
              </div>
              <div className={styles.cardContent}>
                <p>Пользователь: {album.userId}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 relative" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '1rem',
        padding: '3rem',
        minHeight: '400px'
      }}>
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Glass Morphism эффект
        </h2>
        <div className={`${styles.cardGrid}`}>
          {albums.slice(9, 12).map((album) => (
            <div
              key={album.id}
              className={`${styles.card} ${styles.glass} ${styles.animated} ${styles.cardItem}`}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.title}>{album.title}</h3>
              </div>
              <div className={styles.cardContent}>
                <p>ID: {album.id} | Пользователь: {album.userId}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Статистические карточки
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${styles.card} ${styles.statsCard}`}>
            <span className={styles.statsNumber}>{albums.length}</span>
            <span className={styles.statsLabel}>Всего альбомов</span>
          </div>
          <div className={`${styles.card} ${styles.statsCard}`}>
            <span className={styles.statsNumber}>{new Set(albums.map(a => a.userId)).size}</span>
            <span className={styles.statsLabel}>Уникальных пользователей</span>
          </div>
          <div className={`${styles.card} ${styles.statsCard}`}>
            <span className={styles.statsNumber}>60s</span>
            <span className={styles.statsLabel}>Интервал обновления</span>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Стилизация кнопок (SCSS модули)
        </h2>
        <div className="text-center space-y-4">
          <div className={buttonStyles.buttonGroup}>
            <button className={`${buttonStyles.button} ${buttonStyles.primary}`}>
              Основная
            </button>
            <button className={`${buttonStyles.button} ${buttonStyles.secondary}`}>
              Вторичная
            </button>
            <button className={`${buttonStyles.button} ${buttonStyles.success}`}>
              Успех
            </button>
            <button className={`${buttonStyles.button} ${buttonStyles.warning}`}>
              Предупреждение
            </button>
          </div>

          <div className={buttonStyles.buttonGroup}>
            <button className={`${buttonStyles.button} ${buttonStyles.outline}`}>
              Контурная
            </button>
            <button className={`${buttonStyles.button} ${buttonStyles.ghost}`}>
              Призрачная
            </button>
            <button className={`${buttonStyles.button} ${buttonStyles.gradient}`}>
              Градиентная
            </button>
            <button className={`${buttonStyles.button} ${buttonStyles.glass}`}>
              Стеклянная
            </button>
          </div>

          <div className={buttonStyles.buttonGroup}>
            <button className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.small}`}>
              Маленькая
            </button>
            <button className={`${buttonStyles.button} ${buttonStyles.primary}`}>
              Обычная
            </button>
            <button className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.large}`}>
              Большая
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Комбинация Tailwind + встроенные стили
        </h2>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{
            background: 'linear-gradient(45deg, #ff6b6b, #ffa726, #ffee58)',
            padding: '2rem',
            borderRadius: '1rem'
          }}
        >
          {albums.slice(0, 3).map((album) => (
            <div
              key={album.id}
              className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105"
              style={{
                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
              }}
            >
              <h3 className="text-lg font-semibold mb-2 text-white capitalize">
                {album.title}
              </h3>
              <p className="text-white/80 text-sm">
                Альбом #{album.id} от пользователя {album.userId}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export const revalidate = 60;
