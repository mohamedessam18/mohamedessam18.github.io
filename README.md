# Mohamed Essam Portfolio

<div align="center">

[![Live Site](https://img.shields.io/badge/Live-Portfolio-06b6d4?style=for-the-badge)](https://mohamedessam18.github.io)
![React](https://img.shields.io/badge/React-19-111827?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-1d4ed8?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-0f172a?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-0f766e?style=for-the-badge&logo=tailwindcss)

**A polished multilingual portfolio for Mohamed Essam, built with React, TypeScript, Vite, and Tailwind CSS.**

Showcasing skills, projects, services, and contact details in a modern single-page experience with theme switching, animated visuals, and Supabase-powered form handling.

**Status:** Proprietary personal portfolio. Source code is not open for reuse, redistribution, or commercial use without explicit written permission.

</div>

## Overview

This project is a personal portfolio website for **Mohamed Essam**, focused on presenting his work as a **Flutter Developer and Software Developer student**.

This repository is maintained as a **private intellectual property project in licensing terms**, even if the source is visible online. Viewing the code does not grant permission to copy, modify, redistribute, or republish it.

The site is designed as a smooth single-page experience with section-based navigation and a strong visual identity. It highlights:

- Personal introduction and developer profile
- Skills and supporting technical knowledge
- Services and areas of help
- Featured GitHub projects
- Contact options and CV download
- Multilingual support with RTL handling for Arabic

## Live Demo

Visit the live site here:

**[mohamedessam18.github.io](https://mohamedessam18.github.io)**

## Features

- **Single-page portfolio flow** with persistent active section state
- **Dark and light themes** with saved user preference
- **Multilingual interface** in English, Arabic, and Spanish
- **RTL support** when Arabic is selected
- **Animated hero section** with custom bubble background and profile image
- **Projects showcase** linked to GitHub repositories
- **Contact form integration** powered by Supabase
- **Responsive design** optimized for desktop and mobile
- **Bottom navigation UI** for fast section switching
- **CV download action** directly from the contact section

## Tech Stack

### Core

- React 19
- TypeScript
- Vite
- Tailwind CSS

### UI and Utilities

- Lucide React
- Radix UI
- shadcn-style component setup
- localStorage-backed custom hooks

### Backend Service

- Supabase for contact form submissions

### Deployment

- GitHub Pages via `gh-pages`

## Project Structure

```text
.
|-- public/                 Static assets
|-- src/
|   |-- assets/             Images and local media
|   |-- components/         Shared UI and layout components
|   |-- hooks/              Custom hooks for theme, language, storage
|   |-- lib/                Utilities and Supabase client
|   |-- sections/           Page sections (Home, About, Skills, etc.)
|   |-- App.tsx             Main app composition
|   |-- i18n.ts             Translation content and language logic
|   |-- index.css           Global styles
|   `-- main.tsx            App entry point
|-- index.html
|-- tailwind.config.js
|-- vite.config.ts
`-- package.json
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mohamedessam18/mohamedessam18.github.io.git
cd mohamedessam18.github.io
```

This setup is intended for the project owner or explicitly authorized collaborators only.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and add:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These values are required for the contact form integration.

### 4. Start the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

### 6. Preview the production build

```bash
npm run preview
```

## Available Scripts

```bash
npm run dev        # Start local Vite dev server
npm run build      # Type-check and build for production
npm run preview    # Preview the production build locally
npm run deploy     # Deploy dist/ to GitHub Pages
```

## Deployment

This portfolio is configured for **GitHub Pages** deployment.

To publish the site:

```bash
npm run deploy
```

The deployment flow builds the app first using `predeploy`, then publishes the `dist/` directory.

## Portfolio Sections

- **Home**: Intro, profile image, animated background, and call-to-action buttons
- **About**: Personal summary and career focus
- **Skills**: Core, supporting, and soft skills
- **Help**: Services Mohamed can help with
- **Projects**: Selected portfolio work with GitHub links
- **Contact**: Contact form, social links, and CV download

## Localization

The portfolio supports three languages:

- English
- Arabic
- Spanish

Arabic automatically switches the page direction to **RTL** for a better reading experience.

## Contact Data Flow

The contact form sends `name` and `email` to a Supabase table:

```text
contact_messages
```

Make sure your Supabase project includes that table and allows inserts for the portfolio to receive submissions correctly.

## Why This README Is Different

This is not a default Vite starter anymore. The project is now documented as a real portfolio product with:

- Accurate project purpose
- Clear feature breakdown
- Setup and deployment instructions
- Environment variable guidance
- Better structure and presentation

## Author

**Mohamed Essam**

- GitHub: [@mohamedessam18](https://github.com/mohamedessam18)
- LinkedIn: [mohammedessam2](https://www.linkedin.com/in/mohammedessam2)
- Email: [mohvmedesam@gmail.com](mailto:mohvmedesam@gmail.com)

## License

This project is **not open source**.

All rights are reserved by **Mohamed Essam**. No part of this source code, design, content, or assets may be copied, modified, distributed, sublicensed, published, used commercially, or reused in derivative works without prior written permission.

See [LICENSE](LICENSE) for the full terms.
