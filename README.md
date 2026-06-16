# 💰 FinanceApp

Aplicación web de finanzas personales para registrar ingresos y gastos, visualizar el balance general y analizar hábitos de consumo a través de estadísticas y gráficos. Construida como proyecto de aprendizaje práctico de React + TypeScript.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)

## Demo

> Agregá aquí un link a la versión desplegada (Vercel / Netlify) o un GIF/captura de pantalla del dashboard una vez que tengas el deploy listo.

## ✨ Características

- **Dashboard** con balance total, ingresos y gastos del período, distribución de gastos por categoría (barras de progreso) y listado de transacciones recientes.
- **Transacciones**: tabla filtrable por tipo (todos / ingresos / gastos) y por texto de búsqueda en la descripción.
- **Categorías**: tarjetas con el total gastado, cantidad de movimientos y porcentaje que representa cada categoría sobre el gasto total.
- **Estadísticas**: promedio mensual, variación respecto al mes anterior, mes con más gasto, mes de mayor ahorro y categoría top, además de un gráfico combinado de ingresos vs. gastos (Recharts) filtrable por 3 meses / 6 meses / 1 año.
- **Alta de transacciones** mediante un modal con formulario validado (React Hook Form + Zod): tipo (ingreso/gasto), descripción, categoría, fecha y monto.
- **Persistencia local**: las transacciones se guardan en `localStorage`, por lo que los datos se mantienen entre sesiones sin necesidad de un backend.
- **Diseño "Cosmic Dark"**: interfaz oscura con tarjetas translúcidas (`backdrop-blur`), acentos en cian/esmeralda/rojo según el tipo de movimiento, y diseño mobile-first con sidebar colapsable en pantallas chicas.

## 🛠️ Stack técnico

| Categoría | Tecnología |
|---|---|
| Librería UI | React 19 |
| Lenguaje | TypeScript |
| Build tool | Vite |
| Estilos | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Ruteo | React Router DOM 7 |
| Gráficos | Recharts |
| Formularios | React Hook Form + Zod (`@hookform/resolvers`) |
| Estado global | Context API + `useReducer` |
| Gestor de paquetes | pnpm |
| Linter | ESLint + typescript-eslint |

## 📦 Dependencias

### Producción

| Paquete | Versión | Uso en el proyecto |
|---|---|---|
| [`react`](https://react.dev/) | ^19.2.5 | Librería principal de UI |
| [`react-dom`](https://react.dev/) | ^19.2.5 | Renderizado de React en el DOM |
| [`react-router-dom`](https://reactrouter.com/) | ^7.14.2 | Ruteo entre Dashboard, Transacciones, Categorías y Estadísticas (`BrowserRouter`, `Routes`, `NavLink`) |
| [`react-hook-form`](https://react-hook-form.com/) | ^7.77.0 | Manejo del formulario de alta de transacciones en `Modal.tsx` |
| [`zod`](https://zod.dev/) | ^4.4.3 | Esquema de validación del formulario (descripción, categoría, fecha, monto) |
| [`@hookform/resolvers`](https://github.com/react-hook-form/resolvers) | ^5.4.0 | Conecta el esquema de Zod con React Hook Form (`zodResolver`) |
| [`recharts`](https://recharts.org/) | ^3.8.1 | Gráfico de ingresos vs. gastos en la sección de Estadísticas (`ComposedChart`) |
| [`tailwind-scrollbar-hide`](https://github.com/adoxography/tailwind-scrollbar-hide) | ^4.0.0 | Utilidad para ocultar el scrollbar en listados largos |

### Desarrollo

| Paquete | Versión | Uso en el proyecto |
|---|---|---|
| [`typescript`](https://www.typescriptlang.org/) | ~6.0.2 | Tipado estático en todo el proyecto |
| [`vite`](https://vite.dev/) | ^8.0.10 | Servidor de desarrollo y bundler |
| [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react) | ^6.0.1 | Soporte de React (JSX, Fast Refresh) en Vite |
| [`tailwindcss`](https://tailwindcss.com/) | ^4.3.0 | Framework de estilos utility-first |
| [`@tailwindcss/vite`](https://tailwindcss.com/docs/installation/using-vite) | ^4.2.4 | Plugin de integración de Tailwind con Vite |
| [`eslint`](https://eslint.org/) | ^10.2.1 | Linter de JavaScript/TypeScript |
| [`@eslint/js`](https://eslint.org/) | ^10.0.1 | Configuraciones recomendadas de ESLint |
| [`typescript-eslint`](https://typescript-eslint.io/) | ^8.58.2 | Reglas de ESLint específicas para TypeScript |
| [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) | ^7.1.1 | Reglas de buenas prácticas para hooks de React |
| [`eslint-plugin-react-refresh`](https://www.npmjs.com/package/eslint-plugin-react-refresh) | ^0.5.2 | Valida compatibilidad con Fast Refresh |
| [`globals`](https://www.npmjs.com/package/globals) | ^17.5.0 | Variables globales predefinidas para la config de ESLint |
| [`@types/react`](https://www.npmjs.com/package/@types/react) | ^19.2.14 | Tipos de TypeScript para React |
| [`@types/react-dom`](https://www.npmjs.com/package/@types/react-dom) | ^19.2.3 | Tipos de TypeScript para React DOM |
| [`@types/node`](https://www.npmjs.com/package/@types/node) | ^24.12.2 | Tipos de Node.js (usados en archivos de configuración) |

> Gestor de paquetes: el proyecto está fijado a `pnpm@11.5.1` en el campo `packageManager` de `package.json`.

## 📂 Estructura del proyecto

```
src/
├── assets/              # Íconos por categoría (comida, transporte, salud, etc.)
├── components/
│   ├── Layout.tsx        # Layout general: sidebar + área de contenido + modal
│   ├── SideBar.tsx        # Navegación lateral (responsive, con menú hamburguesa en mobile)
│   └── Modal.tsx          # Formulario de alta de transacciones
├── context/
│   └── TransactionContext.tsx   # Estado global de transacciones (useReducer + localStorage)
├── hooks/
│   ├── useTransactions.ts  # Acceso al TransactionContext
│   └── useStats.tsx         # Cálculos derivados para la sección de Estadísticas
├── pages/
│   ├── Home.tsx             # Dashboard
│   ├── Transacciones.tsx    # Listado y filtros
│   ├── Categorias.tsx       # Resumen por categoría
│   └── Estadisticas.tsx     # Métricas y gráficos
├── types/
│   └── index.ts             # Tipos: Transaction, Category, MonthSummary
├── utils/
│   ├── calcSummary.ts       # Cálculo de ingresos/gastos/balance totales
│   └── formatCurrency.ts    # Formato de moneda (es-AR / ARS)
├── App.tsx               # Definición de rutas
└── main.tsx               # Punto de entrada
```

## 🚀 Instalación y uso

### Requisitos previos

- Node.js 18 o superior
- [pnpm](https://pnpm.io/) (el proyecto usa `pnpm-lock.yaml`)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/uriel-olg/Finance-app.git
cd Finance-app

# 2. Instalar dependencias
pnpm install

# 3. Levantar el entorno de desarrollo
pnpm dev
```

La app quedará disponible en `http://localhost:5173` (Vite expone el servidor en la red local gracias a `host: true` en `vite.config.ts`).

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Inicia el servidor de desarrollo con hot reload |
| `pnpm build` | Compila TypeScript (`tsc -b`) y genera el build de producción |
| `pnpm preview` | Sirve localmente el build de producción |
| `pnpm lint` | Corre ESLint sobre todo el proyecto |

## 🧭 Rutas de la aplicación

| Ruta | Página |
|---|---|
| `/` | Dashboard |
| `/transactions` | Transacciones |
| `/categories` | Categorías |
| `/statistics` | Estadísticas |

## 🗺️ Roadmap / Próximos pasos

- [ ] Completar el listado de categorías disponibles al registrar un **gasto** desde el modal (actualmente el array de categorías para gastos está vacío).
- [ ] Permitir editar y eliminar transacciones desde la UI (la función `deleteTransaction` ya existe en el contexto, falta conectarla a un botón en la tabla).
- [ ] Selector de mes funcional en el Dashboard (hoy es estático, muestra "Septiembre").
- [ ] Migrar de `localStorage` a un backend/API para persistencia multi-dispositivo.
- [ ] Tests unitarios para los hooks de cálculo (`useStats`, `calcSummary`).

## 📄 Licencia

Este proyecto no especifica una licencia actualmente. Si pensás publicarlo o que otros lo usen libremente, considerá agregar una (por ejemplo, [MIT](https://choosealicense.com/licenses/mit/)).

## 👤 Autor

**Uriel Olguín** — [@uriel-olg](https://github.com/uriel-olg)