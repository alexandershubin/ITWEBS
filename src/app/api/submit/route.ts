import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const text = formData.get('text') as string;
    const file = formData.get('file') as File | null;
    const timestamp = formData.get('timestamp') as string;

    console.log('Получены данные:');
    console.log('- Текст:', text);
    console.log('- Файл:', file?.name || 'не загружен');
    console.log('- Время:', timestamp);

    if (file) {
      console.log('- Размер файла:', file.size, 'байт');
      console.log('- Тип файла:', file.type);
    }

    const responseData = {
      success: true,
      message: 'Данные успешно получены',
      data: {
        text,
        fileName: file?.name || null,
        fileSize: file?.size || null,
        fileType: file?.type || null,
        timestamp,
        processed: new Date().toISOString()
      }
    };

    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error('Ошибка при обработке запроса:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Ошибка при обработке данных',
        error: error instanceof Error ? error.message : 'Неизвестная ошибка'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'API endpoint работает',
      methods: ['POST'],
      description: 'Отправьте POST запрос с FormData содержащим text и file'
    },
    { status: 200 }
  );
}