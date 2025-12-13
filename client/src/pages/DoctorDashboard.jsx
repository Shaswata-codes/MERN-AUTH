import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, setUserData } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [patientsList, setPatientsList] = useState([]);

  const [stats, setStats] = useState([]);
  const [briefModalOpen, setBriefModalOpen] = useState(false);
  const [briefData, setBriefData] = useState(null);
  const [briefLoadingPt, setBriefLoadingPt] = useState(null);

  /* ---------------- LOGOUT ---------------- */
  const logout = async () => {
    try {
      await axios.post(backendUrl + "/api/auth/logout", {}, { withCredentials: true });
      setIsLoggedin(false);
      setUserData(null);
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [todayRes, allRes, patientRes, statsRes] = await Promise.all([
          axios.get(backendUrl + "/api/appointments/doctor/today", { withCredentials: true }),
          axios.get(backendUrl + "/api/doctors/my/appointments", { withCredentials: true }),
          axios.get(backendUrl + "/api/doctors/my/patients", { withCredentials: true }),
          axios.get(backendUrl + "/api/doctors/my/stats", { withCredentials: true }),
        ]);

        if (todayRes.data.success) setTodaysAppointments(todayRes.data.appointments);
        if (allRes.data.success) setAllAppointments(allRes.data.appointments);
        if (patientRes.data.success) setPatientsList(patientRes.data.patients);

        if (statsRes.data.success) {
          const s = statsRes.data.stats;
          setStats([
            { label: "Total Patients", value: s.totalPatients, icon: "👥" },
            { label: "Appointments Today", value: s.todaysAppointments, icon: "📅" },
            { label: "Pending Reviews", value: s.pendingReviews, icon: "📝" },
            { label: "Rating", value: s.rating, icon: "⭐" },
          ]);
        }
      } catch (err) {
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [backendUrl]);

  /* ---------------- AI BRIEF ---------------- */
  const handleGenerateBrief = async (patientName, reason, id) => {
    setBriefLoadingPt(id);
    try {
      const res = await axios.post(
        backendUrl + "/api/gemini/patient-brief",
        { patientName, reason },
        { withCredentials: true }
      );

      if (res.data.success) {
        setBriefData({ ...res.data.data, patientName });
        setBriefModalOpen(true);
      }
    } catch {
      toast.error("Failed to generate brief");
    } finally {
      setBriefLoadingPt(null);
    }
  };

  if (loading) return <div style={{ padding: "2rem", color: "white" }}>Loading...</div>;

  /* ---------------- JSX ---------------- */
  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "white" }}>
      <nav style={{ padding: "1rem 2rem", background: "#1e293b" }}>
        <h2>🏥 Doctor Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </nav>

      <main style={{ padding: "2rem" }}>
        <h1>Overview</h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "#1e293b", padding: "1rem", borderRadius: "12px" }}>
              <div>{s.icon}</div>
              <h2>{s.value}</h2>
              <p>{s.label}</p>
            </div>
          ))}
        </div>

        <h2 style={{ marginTop: "2rem" }}>Today's Appointments</h2>

        {todaysAppointments.map((apt) => (
          <div
            key={apt._id}
            style={{
              background: "#1e293b",
              padding: "1rem",
              borderRadius: "12px",
              marginTop: "0.75rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <strong>{apt.patientName}</strong>
              <div>{apt.reason}</div>
            </div>
            <button onClick={() => handleGenerateBrief(apt.patientName, apt.reason, apt._id)}>
              {briefLoadingPt === apt._id ? "⌛" : "✨ Brief"}
            </button>
          </div>
        ))}
      </main>

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
          <div style={{ background: "#1e293b", padding: "2rem", borderRadius: "16px" }}>
            <h2>Patient Brief</h2>
            <p>{briefData.summary}</p>
            <button onClick={() => setBriefModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
