# 🚀 TaskManager - Premium SaaS Project Management Platform

TaskManager is a state-of-the-art, high-performance project management solution built for modern teams. Featuring a stunning dark-mode glassmorphism UI, real-time analytics, and role-based access control.

![Dashboard Preview](https://img.shields.io/badge/UI-Premium_Glassmorphism-blueviolet?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-Next.js_15_%2B_Prisma_%2B_SQLite-blue?style=for-the-badge)

## ✨ Features

- **💎 Premium UI/UX**: Professional dark theme with glassmorphism, glowing accents, and smooth micro-animations.
- **📊 Interactive Dashboard**: Real-time charts (Recharts) for activity monitoring and task status breakdown.
- **📁 Project Management**: Dynamic project creation, tracking, and detailed project views.
- **✅ Task Workflows**: Priority-based task management with intuitive status tracking.
- **🔐 Role-Based Access (RBAC)**: Secure access control for Admins, Managers, and Developers.
- **⚙️ Account Settings**: Interactive profile management with real-time database syncing.
- **🔋 Mock Mode**: Intelligent demo mode that populates the workspace with randomized, high-quality data.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Database**: [SQLite](https://www.sqlite.org/) with [Prisma ORM](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd tpms-main
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Initialize Database
```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the magic!

## 🧪 Demo Data
The application includes a built-in `Mock Mode`. If your database is empty, the dashboard will automatically populate with realistic randomized data to showcase the platform's full potential.

---
Built with ❤️ by Antigravity
