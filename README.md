# Student Grade Tracker - CodeAlpha Internship Project

A modern, production-ready full-stack application for managing student grades with comprehensive analytics, built with Spring Boot and React.

![Java](https://img.shields.io/badge/Java-17+-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Features

### Core Functionality
- ✅ **Student Management** - Add, edit, delete, and search students
- ✅ **Course Management** - Manage course catalog with credits and descriptions
- ✅ **Grade Tracking** - Record and track grades for students across courses
- ✅ **Advanced Statistics** - Class average, median, standard deviation, grade distribution
- ✅ **Export Reports** - Download CSV and PDF reports
- ✅ **JWT Authentication** - Secure role-based access control (Admin/User)
- ✅ **Responsive Design** - Mobile-first UI with beautiful animations
- ✅ **Real-time Search** - Fast student and course search
- ✅ **Data Visualization** - Interactive charts and graphs

### Technical Features
- ✅ RESTful API with OpenAPI/Swagger documentation
- ✅ Comprehensive validation and error handling
- ✅ Database: H2 (dev) / PostgreSQL (production)
- ✅ Automated tests with >70% coverage
- ✅ Docker support for easy deployment
- ✅ Sample data seeding
- ✅ CORS configured for frontend integration

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Architecture](#-architecture)
- [API Documentation](#-api-documentation)
- [Installation](#-installation)
- [Usage](#-usage)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- Maven 3.8+ or npm/yarn
- Docker (optional)

### Run with Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd student-grade-tracker

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:8080
# Swagger: http://localhost:8080/swagger-ui.html
```

### Manual Setup

#### Backend
```bash
cd backend

# Build and run
mvn clean install
mvn spring-boot:run

# Or with Java
mvn clean package
java -jar target/student-grade-tracker-1.0.0.jar
```

#### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗 Architecture

### Backend (Java/Spring Boot)
```
backend/
├── src/main/java/com/codealpha/gradetracker/
│   ├── config/          # Security, OpenAPI, Data loader
│   ├── controller/      # REST controllers
│   ├── dto/             # Data Transfer Objects
│   ├── exception/       # Global exception handling
│   ├── model/           # JPA entities
│   ├── repository/      # Spring Data JPA repositories
│   ├── security/        # JWT authentication
│   └── service/         # Business logic
└── src/test/            # Unit and integration tests
```

### Frontend (React/TypeScript)
```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/         # Button, Card, Modal, etc.
│   │   └── layout/     # Sidebar, TopBar, Layout
│   ├── contexts/        # Auth context
│   ├── lib/             # Utilities and axios config
│   ├── pages/           # Application pages
│   ├── services/        # API service layer
│   └── types/           # TypeScript interfaces
```

## 📚 API Documentation

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "token": "eyJhbGci...",
  "type": "Bearer",
  "username": "admin",
  "fullName": "Admin User",
  "role": "ROLE_ADMIN",
  "expiresIn": 86400000
}
```

### Students

#### Get All Students
```http
GET /api/students?page=0&size=10&sortBy=id&sortDir=ASC
Authorization: Bearer {token}

Response:
{
  "content": [...],
  "totalElements": 10,
  "totalPages": 1,
  "size": 10,
  "number": 0
}
```

#### Create Student (Admin only)
```http
POST /api/students
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "555-0100",
  "enrollmentId": "STU001"
}
```

#### Search Students
```http
GET /api/students/search?query=john&page=0&size=10
Authorization: Bearer {token}
```

### Grades

#### Add Grade (Admin only)
```http
POST /api/grades
Authorization: Bearer {token}
Content-Type: application/json

{
  "studentId": 1,
  "courseId": 1,
  "numericScore": 85.5,
  "gradeDate": "2024-11-28",
  "assessment": "Midterm",
  "description": "Midterm examination",
  "weight": 1.0
}
```

#### Get Student Grades
```http
GET /api/grades/student/1
Authorization: Bearer {token}
```

### Statistics

#### Get Overall Statistics
```http
GET /api/statistics
Authorization: Bearer {token}

Response:
{
  "totalStudents": 10,
  "totalCourses": 5,
  "totalGrades": 42,
  "overallAverage": 82.5,
  "median": 83.0,
  "highestScore": 98.5,
  "lowestScore": 62.0,
  "distribution": {
    "gradeA": 8,
    "gradeB": 15,
    "gradeC": 12,
    "gradeD": 5,
    "gradeF": 2
  },
  "topStudents": [...],
  "coursePerformances": [...]
}
```

### Export

#### Export Grades to CSV
```http
GET /api/export/grades/csv
Authorization: Bearer {token}
```

#### Export Student Report to PDF
```http
GET /api/export/student/1/pdf
Authorization: Bearer {token}
```

Full API documentation available at: **http://localhost:8080/swagger-ui.html**

## 🔧 Installation

### Backend Setup

1. **Configure Database (Optional)**

For development, H2 is used by default. For production with PostgreSQL:

```yaml
# backend/src/main/resources/application.yml
spring:
  profiles:
    active: prod
  datasource:
    url: jdbc:postgresql://localhost:5432/gradetracker
    username: postgres
    password: yourpassword
```

2. **Build the Project**

```bash
cd backend
mvn clean install
```

3. **Run Tests**

```bash
mvn test

# With coverage report
mvn test jacoco:report
```

### Frontend Setup

1. **Install Dependencies**

```bash
cd frontend
npm install
```

2. **Configure Environment**

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

3. **Run Development Server**

```bash
npm run dev
```

## 💻 Usage

### Default Credentials

- **Admin**: username: `admin`, password: `admin123`
- **User**: username: `user`, password: `user123`

### Sample Workflow

1. **Login** with admin credentials
2. **Navigate to Students** to view/add/edit students
3. **View Dashboard** for comprehensive statistics
4. **Add Grades** for students in various courses
5. **Export Reports** in CSV or PDF format
6. **View Statistics** with interactive charts

### Key Pages

- **Dashboard**: Overview with charts and top performers
- **Students**: Manage student information
- **Courses**: View and manage courses
- **Statistics**: Detailed analytics and insights
- **Reports**: Export data in various formats

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
mvn test

# Run with coverage
mvn clean test jacoco:report

# View coverage report
open target/site/jacoco/index.html
```

### Sample Test Output
```
StudentServiceTest
  ✓ createStudent_Success
  ✓ createStudent_EmailAlreadyExists_ThrowsException
  ✓ getStudentById_Success
  ✓ deleteStudent_Success

Tests run: 4, Failures: 0, Errors: 0, Skipped: 0
Coverage: 78%
```

## 🐳 Deployment

### Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Build

#### Backend
```bash
cd backend
mvn clean package -DskipTests
java -jar -Dspring.profiles.active=prod target/student-grade-tracker-1.0.0.jar
```

#### Frontend
```bash
cd frontend
npm run build

# Serve with nginx or any static server
npx serve -s dist
```

### Environment Variables

**Backend:**
- `SPRING_PROFILES_ACTIVE`: Active profile (dev/prod)
- `DATABASE_URL`: Database connection string
- `JWT_SECRET`: Secret key for JWT tokens

**Frontend:**
- `VITE_API_BASE_URL`: Backend API URL

## 📸 Screenshots

*(Screenshots would go here in actual implementation)*

## 🎯 Project Structure

### Database Schema

**Students Table:**
- id, firstName, lastName, email, phoneNumber, address, enrollmentId, active, createdAt, updatedAt

**Courses Table:**
- id, name, code, description, credits, active, createdAt, updatedAt

**Grades Table:**
- id, studentId, courseId, numericScore, gradeDate, description, assessment, weight, createdAt, updatedAt

**Users Table:**
- id, username, password, fullName, role, enabled

### API Endpoints Summary

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/login | Login | Public |
| GET | /api/students | List students | User |
| POST | /api/students | Create student | Admin |
| PUT | /api/students/{id} | Update student | Admin |
| DELETE | /api/students/{id} | Delete student | Admin |
| GET | /api/courses | List courses | User |
| POST | /api/grades | Add grade | Admin |
| GET | /api/statistics | Get statistics | User |
| GET | /api/export/grades/csv | Export CSV | User |
| GET | /api/export/grades/pdf | Export PDF | User |

## 🛠 Technologies Used

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Security (JWT)
- Spring Data JPA
- H2 Database (dev) / PostgreSQL (prod)
- iText7 (PDF generation)
- Apache Commons CSV
- Swagger/OpenAPI
- JUnit 5 & Mockito
- Lombok

### Frontend
- React 18.2
- TypeScript 5.2
- Vite
- React Router v6
- Axios
- TailwindCSS
- Framer Motion
- Recharts
- Lucide Icons
- React Hot Toast

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**CodeAlpha Internship Project**

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the amazing library
- TailwindCSS for the utility-first CSS framework
- All contributors and testers

---

**Built with ❤️ for CodeAlpha Internship Program**
