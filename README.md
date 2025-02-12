# Custom DatePicker Component

Кастомный компонент выбора даты, построенный на основе Ant Design DatePicker с расширенной функциональностью и адаптированный для использования в формах.

## Особенности

- 🇷🇺 Русская локализация
- 📅 Три режима отображения: дата, месяц, год
- 🔒 Блокировка выбора прошедших дат
- 🎨 Кастомизированный внешний вид
- 📋 Интеграция с Ant Design Form
- 🔄 Поддержка формата "DD.MM.YYYY"

## Технологии

- React
- TypeScript
- Ant Design (antd)
- dayjs
- Vite

## Установка

```bash
# Клонирование репозитория
git clone [url-вашего-репозитория]
cd datapicker-app

# Установка зависимостей
npm install
```

## Запуск проекта

```bash
# Режим разработки
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр собранного проекта
npm run preview
```

## Использование компонента

### Базовое использование

```tsx
import CustomDatePicker from './components/CustomDatePicker';

function MyComponent() {
  return <CustomDatePicker />;
}
```

### Использование в форме Ant Design

```tsx
import { Form } from 'antd';
import CustomDatePicker from './components/CustomDatePicker';

function MyForm() {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Form.Item
        name="date"
        label="Выберите дату"
        rules={[{ required: true, message: 'Пожалуйста, выберите дату' }]}
      >
        <CustomDatePicker />
      </Form.Item>
    </Form>
  );
}
```

## Props

| Prop | Тип | Описание |
|------|-----|----------|
| value | `string \| null` | Значение даты в формате "YYYY-MM-DD" |
| onChange | `(value: string \| null) => void` | Callback при изменении даты |

## Особенности реализации

### Режимы отображения
- Поддерживаются режимы выбора даты, месяца и года
- Автоматическое переключение режимов при навигации
- Блокировка перехода в режим десятилетий

### Блокировка дат
- Все даты до текущего месяца заблокированы
- Блокировка применяется ко всем режимам отображения

### Стилизация
- Кастомная стилизация ячеек календаря
- Выделение текущей даты/месяца/года
- Кастомные кнопки навигации

## Структура проекта

```
src/
  components/
    CustomDatePicker/
      index.tsx      # Основной компонент
      styles.css     # Стили компонента
  App.tsx           # Пример использования
```

## Лицензия

MIT
