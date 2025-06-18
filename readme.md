# 🎓 Course Management System

A modern, full-stack **Course Management System** for students and administrators, built with **React** (frontend) and **FastAPI** (backend).  
Easily manage courses, assignments, grades, profiles, and more — with a beautiful, responsive dashboard.

---

## ✨ Features

- **Student Dashboard**: At-a-glance widgets for courses, assignments, and grades.
- **Course Management**: View, enroll, and manage your courses.
- **Assignments**: Track, submit, and review assignments.
- **Grades**: Detailed grade breakdowns for each course.
- **Profile**: View and update your personal information.
- **Settings**: Change password, notification preferences, and delete account.
- **Authentication**: Secure login/logout flow.
- **Responsive Design**: Works beautifully on desktop and mobile.
- **Modern UI**: Clean, professional, and easy to use.

---

## 🖥️ Tech Stack

| Frontend           | Backend         | Database      | Other                |
|--------------------|----------------|--------------|----------------------|
| React (Hooks)      | FastAPI        | PostgreSQL   | RESTful API, CORS    |
| React Router DOM   | Uvicorn        | (or SQLite)  | JWT-ready structure  |
| CSS Modules        | Pydantic       |              |                      |

---

## 🚀 Getting Started

### 1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/course-management-system.git
cd course-management-system
```

### 2. **Backend Setup**

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Configure your database in database/connection.py
uvicorn main:app --reload
```

### 3. **Frontend Setup**

```bash
cd frontend
npm install
npm start
```

---

## 📚 Project Structure

```
course-management-system/
│
├── backend/
│   ├── main.py
├── database/
│       └── connection.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── Assignments.jsx
│   │   │   ├── Grades.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── ...
│   │   └── App.js
│   └── ...
└── README.md
```

---

## 🛠️ Configuration

- **Database**:  
  Edit `database/connection.py` to set your DB credentials.
- **CORS**:  
  CORS is enabled for development. Restrict origins in production.
- **Environment Variables**:  
  Use `.env` files for secrets and DB URLs.

---

## 📦 API Endpoints

- `POST   /api/profile` — Get profile by email
- `POST   /api/settings` — Get user settings
- `PUT    /api/settings` — Update profile/settings
- `PATCH  /api/settings/password` — Change password
- `DELETE /api/settings` — Delete account
- `GET    /api/courses` — List all courses
- `GET    /api/assignments` — List all assignments
- `GET    /api/grades` — List all grades

---

## 🎨 Screenshots

<p align="center">
  <img src="https://user-images.githubusercontent.com/yourusername/dashboard.png" width="700" alt="Dashboard Screenshot"/>
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/yourusername/courses.png" width="700" alt="Courses Screenshot"/>
</p>

---

## 🤝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 💡 Inspiration

Built with ❤️ to simplify course management for students and educators by Shujaat