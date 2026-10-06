<div align="center">

<br />

# 📰 THE DAILY BRIEF

### _The stories worth knowing._

<br />

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-2457FF?style=for-the-badge)](https://news-portal-website-application.vercel.app/)
[![News API](https://img.shields.io/badge/📡_News_API-v2-111111?style=for-the-badge)](https://news-api-v2.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-111111?style=flat-square&logo=auth0&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

<br />

</div>

---

## ✨ About the Project

**The Daily Brief** is a news website where you can read the latest stories in one clean place. News is grouped into Bangladesh, World, Health, Video and more, so it is easy to find what you want.

The design is simple and easy on the eyes. Big headlines, plenty of space and clear text keep the focus on the stories.

> 🔗 **Live Site:** [news-portal-website-application.vercel.app](https://news-portal-website-application.vercel.app/)

---

## 🚀 Features

|     | Feature                 | Description                                                                   |
| --- | ----------------------- | ----------------------------------------------------------------------------- |
| 🏠  | **Dynamic Homepage**    | Lead story, featured stories, section-wise news and a ranked "most read" list |
| 🗂️  | **Category Pages**      | World, Politics, Economy, Technology, Health, Sports and Video                |
| 📖  | **Article Details**     | Headline, byline, publish date, source, tags and full article body            |
| 🔐  | **Authentication**      | Email & password, plus Google and GitHub sign-in via Better Auth              |
| 🔔  | **Toast Feedback**      | Instant success / error messages with react-toastify                          |
| ⏳  | **Loading & Not-Found** | Dedicated loading states and a custom 404 page                                |
| 📬  | **Newsletter**          | Subscribe section in the footer                                               |
| 📱  | **Fully Responsive**    | Optimised for mobile, tablet and desktop                                      |
| ✍️  | **Editorial Design**    | Serif headlines, clean UI type, restrained colour palette                     |

---

## 🛠️ Tech Stack

| Area               | Technology                                     |
| ------------------ | ---------------------------------------------- |
| **Framework**      | Next.js (App Router)                           |
| **Language**       | TypeScript                                     |
| **Styling**        | Tailwind CSS                                   |
| **Authentication** | Better Auth (Email/Password, Google, GitHub)   |
| **Notifications**  | react-toastify                                 |
| **Fonts**          | Newsreader (headlines), Inter (UI)             |
| **Data Source**    | [News API v2](https://news-api-v2.vercel.app/) |
| **Deployment**     | Vercel                                         |

---

## 📡 API Used

All news content is fetched from **[News API v2](https://news-api-v2.vercel.app/)**.

**Base URL:** `https://news-api-v2.vercel.app`

| Method | Endpoint               | Purpose                                         |
| ------ | ---------------------- | ----------------------------------------------- |
| `GET`  | `/api/categories`      | List all categories                             |
| `GET`  | `/api/news`            | Latest news                                     |
| `GET`  | `/api/news/sections`   | Section-wise news (Bangladesh, India, World...) |
| `GET`  | `/api/news/most-read`  | Most read stories                               |
| `GET`  | `/api/category/{slug}` | News by category                                |
| `GET`  | `/api/article/{id}`    | Single article details                          |

---

## 🎨 Design System

| Token      | Colour                                                                    | Hex       |
| ---------- | ------------------------------------------------------------------------- | --------- |
| Background | ![#F8F8F6](https://img.shields.io/badge/-F8F8F6-F8F8F6?style=flat-square) | `#F8F8F6` |
| Text       | ![#111111](https://img.shields.io/badge/-111111-111111?style=flat-square) | `#111111` |
| Muted Text | ![#6B6B6B](https://img.shields.io/badge/-6B6B6B-6B6B6B?style=flat-square) | `#6B6B6B` |
| Borders    | ![#E4E4E0](https://img.shields.io/badge/-E4E4E0-E4E4E0?style=flat-square) | `#E4E4E0` |
| Accent     | ![#2457FF](https://img.shields.io/badge/-2457FF-2457FF?style=flat-square) | `#2457FF` |

**Typography:** `Newsreader` for headlines and brand, `Inter` for UI text.

---

## ⚡ Getting Started

### Prerequisites

- Node.js `18+`
- npm, pnpm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mahenaj-tabassum/<your-repo-name>.git

# 2. Move into the project
cd <your-repo-name>

# 3. Install dependencies
npm install

# 4. Add environment variables (see below)

# 5. Start the development server
npm run dev
```

Open **http://localhost:3000** in your browser. 🎉

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root:

```dotenv
# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_DATABASE_URL=

# Google OAuth
BETTER_AUTH_GOOGLE_CLIENT_ID=
BETTER_AUTH_GOOGLE_CLIENT_SECRET=

# GitHub OAuth
BETTER_AUTH_GITHUB_CLIENT_ID=
BETTER_AUTH_GITHUB_CLIENT_SECRET=
```

> ⚠️ Never commit your `.env.local` file. Keep it listed in `.gitignore`.


---


## 🙏 Acknowledgements

- 📡 News content powered by [News API v2](https://news-api-v2.vercel.app/) (stories sourced from BBC Bangla)
- 🎓 Built while following the Programming Hero course

> ⚠️ This is a portfolio/learning project. All news content belongs to its original publishers.

---

## 👩‍💻 Author

**Mahenaj Tabassum Powshi**
_Aspiring MERN Stack Developer · Bangladesh_

[![GitHub](https://img.shields.io/badge/GitHub-mahenaj--tabassum-181717?style=for-the-badge&logo=github)](https://github.com/mahenaj-tabassum)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-mahenaj--tabassum-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/mahenaj-tabassum)

<br />

<div align="center">

### ⭐ If you like this project, give it a star!

_Made with ❤️ in Bangladesh_

</div>
