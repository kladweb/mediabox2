# 📺 MEDIABOX

**MediaBox 2** is a web application that provides step-by-step guides for setting up devices and applications to watch TV and other media content.

The project aims to make device configuration easier with clear instructions, illustrations, and a simple user interface.

🌐 **Live Demo:** [mediabox2.kladpav.workers.dev](https://mediabox2.kladpav.workers.dev/)

---

## ✨ Features

- **Step-by-step guides** — easy-to-follow instructions for configuring devices and applications.
- **Illustrated tutorials** — visual guides to make setup easier.
- **Multilingual interface** — English and Russian language support.
- **Responsive design** — comfortable to use on different screen sizes.
- **Simple navigation** — find the instructions you need without unnecessary steps.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript
- **Routing:** React Router v7
- **UI:** Material UI (MUI)
- **Internationalization:** i18next, react-i18next
- **Build tool:** Vite
- **Hosting & Deployment:** Cloudflare Workers
- **Version control:** Git & GitHub

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/kladweb/mediabox2.git
cd mediabox2
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will start the local development server. Open the URL displayed in your terminal (usually `http://localhost:5173`).

---

## 📦 Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npx wrangler dev` | Run the application locally using Cloudflare Workers |
| `npx wrangler deploy` | Deploy the application to Cloudflare Workers |

---

## ☁️ Deployment

The project is configured for deployment on **Cloudflare Workers** using Static Assets.

Deployment is integrated with GitHub:

1. Push changes to the `main` branch.
2. Cloudflare automatically builds the application.
3. The production version is deployed to Cloudflare Workers.

Pull Requests can also trigger preview deployments, allowing changes to be tested before merging.

---

## 🤝 Contributing

Suggestions, bug reports, and contributions are welcome. Feel free to open an issue or submit a pull request.

---

*Built with React, TypeScript, and Cloudflare.*
