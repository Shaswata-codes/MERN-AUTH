import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

/* -------------------- RANDOM HELPERS -------------------- */
const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const doctorNames = ["Dr. Sarah", "Dr. Amit", "Dr. John", "Dr. Neha", "Dr. Alex"];
const specializations = [
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedic",
  "General Physician",
];

const patients = [
  "John Doe",
  "Jane Smith",
  "Robert Johnson",
  "Emily Davis",
  "Michael Brown",
  "Olivia Wilson",
  "Daniel Taylor",
  "Sophia Anderson",
];

const reasons = [
  "Regular Checkup",
  "Skin Rash Consultation",
  "Hypertension Follow-up",
  "Lab Results Review",
  "Chest Pain",
  "Migraine",
  "Diabetes Monitoring",
  "Allergy Symptoms",
];

const appointmentTypes = ["Video", "In-Person"];

/* -------------------- COMPONENT -------------------- */
const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { setIsLoggedin, setUserData, backendUrl } = useContext(AppContext);

  const doctorName = randomFrom(doctorNames);
  const specialization = randomFrom(specializations);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [briefModalOpen, setBriefModalOpen] = useState(false);
  const [briefData, setBriefData] = useState(null);
  const [briefLoadingPt, setBriefLoadingPt] = useState(null);

  /* -------------------- RANDOM STATS -------------------- */
  const stats = [
    {
      label: "Total Patients",
      value: randomInt(800, 2500),
      icon: "👥",
      trend: `+${randomInt(5, 20)}%`,
    },
    {
      label: "Appointments Today",
      value: randomInt(5, 15),
      icon: "📅",
      trend: randomFrom(["Busy", "Normal", "Light"]),
    },
    {
      label: "Pending Reviews",
      value: randomInt(0, 6),
      icon: "📝",
      trend: randomFrom(["Urgent", "Review", "OK"]),
    },
    {
      label: "Average Rating",
      value: (Math.random() * (5 - 4.5) + 4.5).toFixed(1),
      icon: "⭐",
      trend: "Excellent",
    },
  ];

  /* -------------------- RANDOM APPOINTMENTS -------------------- */
  const todaysAppointments = Array.from(
    { length: randomInt(4, 8) },
    (_, i) => ({
      id: i + 1,
      patient: randomFrom(patients),
      reason: randomFrom(reasons),
      time: `${randomInt(9, 16)}:${randomFrom([
        "00",
        "15",
        "30",
        "45",
      ])} ${randomFrom(["AM", "PM"])}`,
      type: randomFrom(appointmentTypes),
    })
  );

  /* -------------------- LOGOUT -------------------- */
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        toast.success("Logged out successfully!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* -------------------- AI BRIEF (MOCK) -------------------- */
  const handleGenerateBrief = (patientName, reason, id) => {
    setBriefLoadingPt(id);

    setTimeout(() => {
      setBriefData({
        patientName,
        summary: `${patientName} is visiting today for ${reason}. No critical alerts found, but further evaluation is recommended.`,
        history: [
          "Previous consultations completed",
          "No known drug allergies",
          "Vitals stable in last visit",
        ],
        questions: [
          "Any recent discomfort?",
          "Are symptoms improving?",
          "Any new medications?",
        ],
      });
      setBriefModalOpen(true);
      setBriefLoadingPt(null);
    }, 800);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "white" }}>
      {/* TOP BAR */}
      <nav
        style={{
          height: "70px",
          background: "rgba(30,41,59,0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
        }}
      >
        <h2>🏥 HealthPortal — Doctor</h2>
        <div>
          <strong>{doctorName}</strong>
          <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>
            {specialization}
          </div>
        </div>
      </nav>

      <div style={{ display: "flex" }}>
        {/* SIDEBAR */}
        <aside style={{ width: "240px", padding: "1.5rem" }}>
          {["dashboard", "appointments", "patients", "settings"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "0.75rem",
                cursor: "pointer",
                color: activeTab === tab ? "#34d399" : "#94a3b8",
              }}
            >
              {tab.toUpperCase()}
            </div>
          ))}
          <div onClick={logout} style={{ marginTop: "2rem", cursor: "pointer" }}>
            🚪 Logout
          </div>
        </aside>

        {/* MAIN */}
        <main style={{ flex: 1, padding: "2rem" }}>
          <h1>Doctor Dashboard</h1>

          {/* STATS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "1.5rem",
              margin: "2rem 0",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  background: "#1e293b",
                  padding: "1.5rem",
                  borderRadius: "16px",
                }}
              >
                <div>{s.icon}</div>
                <h2>{s.value}</h2>
                <p>{s.label}</p>
                <small>{s.trend}</small>
              </div>
            ))}
          </div>

          {/* APPOINTMENTS */}
          <h2>Today's Appointments</h2>
          {todaysAppointments.map((apt) => (
            <div
              key={apt.id}
              style={{
                background: "#1e293b",
                padding: "1rem",
                borderRadius: "12px",
                marginBottom: "0.75rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{apt.patient}</strong>
                <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                  {apt.reason} • {apt.time}
                </div>
              </div>
              <button
                onClick={() =>
                  handleGenerateBrief(apt.patient, apt.reason, apt.id)
                }
              >
                {briefLoadingPt === apt.id ? "⌛" : "✨ Brief"}
              </button>
            </div>
          ))}
        </main>
      </div>

      {/* AI BRIEF MODAL */}
      {briefModalOpen && briefData && (
        <div
          onClick={() => setBriefModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#1e293b",
              padding: "2rem",
              borderRadius: "20px",
              width: "90%",
              maxWidth: "500px",
            }}
          >
            <h2>✨ Patient Brief</h2>
            <p>{briefData.summary}</p>
            <ul>
              {briefData.history.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
            <button onClick={() => setBriefModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
