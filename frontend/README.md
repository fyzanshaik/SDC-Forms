### Frontend README

```markdown
# 🎨 Frontend of Student Developers Club Registration App

This is the frontend part of the **Student Developers Club Registration App**. Built using React and Vite, it provides an interactive interface for students to register for events easily.

## 📦 Features

- **Responsive Design**: Works seamlessly on mobile and desktop devices. 📱💻
- **Dark Mode Support**: Toggle between light and dark themes for a better user experience. 🌙
- **Form Validation**: Real-time validation using Zod and React Hook Form. ✔️
- **GitHub Integration**: Access to the project repository for feedback and contributions. 🐙

## 🛠️ Tech Stack

- **React**: JavaScript library for building user interfaces.
- **Vite**: Build tool that provides a fast development experience.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Zod**: Type-safe schema declaration and validation.
- **React Hook Form**: Easy form validation and management.

## 🚀 Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/fyzanshaik/SDC-Forms.git
   cd SDC-Forms/frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   Create a `.env` file and define your environment variables. For example:
   ```env
   VITE_API_URL=http://localhost:8080/api
   ```

4. **Run the Application**:
   Start the development server:
   ```bash
   npm run dev
   ```

5. **Open your Browser**:
   Navigate to `http://localhost:3000` to view the app. 🌟

## 🗄️ Database Schema

The backend utilizes PostgreSQL as the database management system with Prisma as the ORM. Below is the schema structure for the Student Developers Club Registration App.

### Student Table

| Column Name   | Data Type      | Constraints                           | Description                     |
|---------------|----------------|---------------------------------------|---------------------------------|
| `id`          | `INTEGER`      | Primary Key, Auto Increment           | Unique identifier for each student. |
| `firstName`   | `VARCHAR(50)`  | NOT NULL                              | Student's first name.          |
| `lastName`    | `VARCHAR(50)`  | NOT NULL                              | Student's last name.           |
| `year`        | `ENUM`         | NOT NULL (`'ONE', 'TWO', 'THREE', 'FOUR'`) | Year of study.               |
| `branch`      | `ENUM`         | NOT NULL (`'CSE', 'ECE', 'EEE', 'AIML', 'AIDS', 'CSD', 'ME'`) | Student's branch of study. |
| `section`     | `CHAR(1)`      | NOT NULL                              | Student's section (A, B, C, etc.). |
| `phoneNumber` | `VARCHAR(10)`  | NOT NULL, UNIQUE                      | Student's phone number.        |
| `email`       | `VARCHAR(100)` | NOT NULL, UNIQUE                      | Student's email address.       |
| `createdAt`   | `TIMESTAMP`    | DEFAULT CURRENT_TIMESTAMP             | Timestamp of registration.     |

### Notes

- The `year` and `branch` fields use enums to restrict values to predefined options.
- `createdAt` field is automatically set to the current timestamp upon record creation.

### Relationships

- **No relationships** are defined in this initial schema, but you can extend it in the future for features like user roles or event registrations.

### Migrations

To create the database structure, run the following Prisma command:

```bash
npx prisma migrate dev --name init


## 🤝 Contributing

Contributions are welcome! If you find any issues or have suggestions, please create an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 Contact

For inquiries or more information, feel free to reach out!

Thank you for using our frontend! 🎉
