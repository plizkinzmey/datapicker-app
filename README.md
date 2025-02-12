# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

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
- Кастомная кнопка навигации "Назад"

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
