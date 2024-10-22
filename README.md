# 🎉 Student Developers Club Registration App

Welcome to the **Student Developers Club** registration app! 🚀 This application is designed for our first event, allowing students to register seamlessly and manage their information effectively.

## 📦 Features

- **User Registration**: Easily register for the event by filling out a simple form. 📝
- **Form Validation**: Ensures all entries are valid using real-time validation. ✔️
- **Dark Mode**: A modern UI that supports both light and dark themes for a better user experience. 🌙
- **GitHub Integration**: Quick access to the codebase and an option to report issues directly on GitHub. 🐙
  
## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Zod, React Hook Form
- **Backend**: Express, Prisma, Nodemailer, Redis
- **Database**: PostgreSQL
- **Deployment**: Render for backend, Vercel for frontend

## 🚀 Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/fyzanshaik/SDC-Forms.git
   cd SDC-Forms
   ```

2. **Install Dependencies**:
   For the frontend:
   ```bash
   cd frontend
   npm install
   ```

   For the backend:
   ```bash
   cd backend
   npm install
   ```

3. **Setup Environment Variables**:
   Create a `.env` file in both the frontend and backend directories to store your environment variables. Ensure to prefix your variable names with `VITE_` for Vite to recognize them in the frontend. Example:
   ```env
   # Frontend
   VITE_API_URL=http://localhost:8080/api

   # Backend
   DATABASE_URL=postgres://user:password@localhost:5432/mydb
   ```

4. **Run the Application**:
   Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

   Then start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open your Browser**:
   Navigate to `http://localhost:3000` to see the app in action! 🌟

## 🤝 Contributing

We welcome contributions! If you have suggestions for improvements or want to report bugs, feel free to create an issue or submit a pull request. 

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🐦 Connect with Us

For more updates and events, follow us on our social media channels! 

Thank you for checking out our registration app! We hope to see you at the event! 🎊

