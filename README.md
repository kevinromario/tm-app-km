# Task Manager Frontend

This is the frontend for the Task Manager application, built using **React**, **Vite**, **TypeScript**, and **Fluent UI v9**.

> 💡 Live Demo: [https://tm-app-km.vercel.app/](https://tm-app-km.vercel.app/)

---

## ✨ Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fluent UI v9](https://react.fluentui.dev/)
- [Axios](https://axios-http.com/)

> ⚠️ **Note**: Fluent UI v9 currently does **not support React 19** as of this writing.

---

## 📦 Setup & Development

### 1. Clone the repository

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
VITE_BACKEND_URL=http://localhost:7071/api
```

You can change `VITE_BACKEND_URL` to point to your deployed backend if needed.

### 4. Start development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Environment Variables

Vite uses `VITE_` prefix for exposing env variables to the frontend. Example:

```ts
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
```

---

## 📦 Build

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 🚀 Deployment

This project is deployed on **Vercel**. On push to the main branch, Vercel automatically builds and deploys the project.

Live URL: [https://tm-app-km.vercel.app/](https://tm-app-km.vercel.app/)

---

## 📄 License

MIT — feel free to use and modify.
