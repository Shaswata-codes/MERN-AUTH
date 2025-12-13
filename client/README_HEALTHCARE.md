# 🏥 Doctor-Patient Management Portal

A comprehensive, modern healthcare management web application built with React and Vite, featuring three distinct user roles: **Patient**, **Doctor**, and **Admin**.

![Healthcare Portal](https://img.shields.io/badge/Healthcare-Portal-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite)

## ✨ Features

### 🎨 Design Highlights

- **Premium UI/UX**: Modern glassmorphism effects, smooth animations, and gradient color schemes
- **Medical Theme**: Professional color palette inspired by healthcare (blues, teals, and greens)
- **Responsive Design**: Fully responsive across all devices
- **Micro-animations**: Engaging hover effects and transitions
- **Custom Scrollbars**: Styled scrollbars matching the theme
- **Google Fonts**: Inter for body text, Outfit for headings

### 👥 User Roles

#### 1. **Patient Dashboard** (`/patient-dashboard`)

**Features:**
- 📊 **Dashboard Overview**
  - Real-time statistics (upcoming appointments, completed visits, available doctors)
  - Quick action buttons (Book Appointment, View Health Records, Prescriptions)
  - Upcoming appointments with doctor details and status badges

- 📅 **Appointment Booking**
  - Browse available doctors by specialization
  - View doctor ratings and experience
  - Interactive booking modal with date/time selection
  - Reason for visit input

- 📋 **Appointment History**
  - Complete table view of past appointments
  - Doctor name, specialization, date, time
  - Status indicators and action buttons

- 🔧 **Additional Features**
  - Health records management
  - Digital prescriptions
  - User profile settings

#### 2. **Doctor Dashboard** (`/doctor-dashboard`)

**Features:**
- 📊 **Dashboard Overview**
  - Today's appointment count
  - Total patients under care
  - Pending vs confirmed appointments
  - Real-time schedule updates

- 🗓️ **Today's Schedule**
  - Chronological list of appointments
  - Patient names with avatars
  - Appointment reasons and times
  - Status management (confirmed/pending)

- 👥 **Patient Management**
  - Complete patient database
  - Patient demographics (age, last visit)
  - Medical conditions tracking
  - Quick access to patient records

- 📅 **Weekly Schedule**
  - Day-wise appointment overview
  - Working hours management
  - Appointment density tracking
  - Schedule customization

- ⚡ **Quick Actions**
  - Add prescriptions
  - View all patients
  - Manage availability

#### 3. **Admin Dashboard** (`/admin-dashboard`)

**Features:**
- 📊 **System Overview**
  - Total patients count (1,234+)
  - Active doctors count (56+)
  - Total appointments (3,456+)
  - Pending approvals tracking

- 👨‍⚕️ **Doctor Management**
  - Complete doctor database
  - Specialization tracking
  - Patient load per doctor
  - Rating system
  - Approval workflow for new doctors

- 👥 **Patient Management**
  - Patient registration oversight
  - Appointment history per patient
  - Account status management
  - Demographics tracking

- 📈 **Recent Activities**
  - Real-time activity feed
  - Registration notifications
  - Appointment tracking
  - Doctor verification updates

- ⚙️ **Quick Actions**
  - Add new doctors/patients
  - Generate reports
  - System settings
  - Approval management

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd /home/vagish_arch/newfolder000/thisgemini/MERN-AUTH/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open your browser and navigate to: `http://localhost:5178/`
   - Or the port shown in the terminal output

## 📁 Project Structure

```
client/
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx        # Homepage with role selection
│   │   ├── LoginPage.jsx          # User authentication
│   │   ├── Register.jsx           # User registration with role-specific fields
│   │   ├── PatientDashboard.jsx   # Patient portal
│   │   ├── DoctorDashboard.jsx    # Doctor portal
│   │   └── AdminDashboard.jsx     # Admin portal
│   ├── App.jsx                     # Main routing configuration
│   ├── App.css                     # Component-specific styles
│   ├── index.css                   # Global styles & design system
│   └── main.jsx                    # Application entry point
├── public/                         # Static assets
├── package.json                    # Dependencies
└── vite.config.js                  # Vite configuration
```

## 🎨 Design System

### Color Palette

**Primary Colors (Medical Blue & Teal)**
- Primary-500: `#0284c7` - Main brand color
- Primary-600: `#0369a1` - Hover states
- Primary-700: `#075985` - Active states

**Accent Colors (Medical Green)**
- Accent-500: `#10b981` - Success states
- Accent-600: `#059669` - Confirmed appointments
- Accent-700: `#047857` - Active confirmations

**Functional Colors**
- Success: `#10b981` - Green for positive actions
- Warning: `#f59e0b` - Orange for pending items
- Error: `#ef4444` - Red for critical alerts
- Info: `#3b82f6` - Blue for informational content

### Typography

- **Headings**: Outfit (Google Fonts) - Bold, modern, professional
- **Body Text**: Inter (Google Fonts) - Clean, readable, versatile

### Components

**Reusable UI Elements:**
- `.card-premium` - Elevated cards with hover effects
- `.glass-effect` - Glassmorphism backgrounds
- `.btn-primary` / `.btn-secondary` - Gradient buttons
- `.stats-card` - Animated statistic displays
- `.appointment-card` - Appointment list items
- `.patient-card` - Patient information cards
- `.badge-*` - Status indicators
- `.modal-overlay` / `.modal-content` - Dialog boxes

## 🌐 Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | LandingPage | Homepage with feature showcase |
| `/login` | LoginPage | User authentication |
| `/register` | Register | User registration |
| `/patient-dashboard` | PatientDashboard | Patient portal |
| `/doctor-dashboard` | DoctorDashboard | Doctor portal |
| `/admin-dashboard` | AdminDashboard | Admin portal |

## 🔧 Technologies Used

- **React** (v19.2.0) - UI framework
- **React Router DOM** (v7.10.1) - Navigation
- **Vite** (v7.2.4) - Build tool
- **TailwindCSS** (v3.4.19) - Utility-first CSS
- **Axios** (v1.13.2) - HTTP client
- **React Toastify** (v11.0.5) - Notifications

## 🎯 Key Features to Implement (Backend)

The frontend is ready for integration with these backend endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Appointments
- `GET /api/appointments` - Fetch appointments
- `POST /api/appointments` - Book appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Doctors
- `GET /api/doctors` - List all doctors
- `GET /api/doctors/:id` - Get doctor details
- `POST /api/doctors` - Add new doctor (admin)
- `PUT /api/doctors/:id` - Update doctor info

### Patients
- `GET /api/patients` - List all patients
- `GET /api/patients/:id` - Get patient details
- `POST /api/patients` - Add new patient
- `PUT /api/patients/:id` - Update patient info

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Animation Classes

- `.animate-fadeIn` - Fade in from bottom
- `.animate-slideIn` - Slide in from left
- `.animate-pulse` - Pulsing effect

## 🔐 Security Considerations

When implementing the backend:
1. Implement JWT authentication
2. Role-based access control (RBAC)
3. Input validation and sanitization
4. HTTPS for all API calls
5. Password hashing (bcrypt)
6. CORS configuration
7. Rate limiting

## 📝 Future Enhancements

- [ ] Video consultation feature
- [ ] Chat messaging between patients and doctors
- [ ] Payment integration for appointments
- [ ] Medical reports upload and storage
- [ ] Push notifications for appointments
- [ ] Email reminders
- [ ] Analytics dashboard for admin
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Prescription e-signature

## 🐛 Known Issues

- Backend integration pending
- Mock data currently used for demonstration
- Email verification not implemented yet

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

Created by the MERN-AUTH development team

---

**Running on:** `http://localhost:5178/`

**Last Updated:** December 13, 2025
