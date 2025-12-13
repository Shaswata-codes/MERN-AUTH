<<<<<<< HEAD
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
=======
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
>>>>>>> 8c70b3d4493c216c31bc7bc7745c1bd6bd742940

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

<<<<<<< HEAD
  const doctorName = randomFrom(doctorNames);
  const specialization = randomFrom(specializations);
=======
    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/logout');
            if (data.success) {
                setIsLoggedin(false);
                setUserData(false);
                toast.success("Logged out successfully!");
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);
>>>>>>> 8c70b3d4493c216c31bc7bc7745c1bd6bd742940

  const [activeTab, setActiveTab] = useState("dashboard");
  const [briefModalOpen, setBriefModalOpen] = useState(false);
  const [briefData, setBriefData] = useState(null);
  const [briefLoadingPt, setBriefLoadingPt] = useState(null);

<<<<<<< HEAD
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
=======
    // Data from backend
    const [todaysAppointments, setTodaysAppointments] = useState([]);
    const [allAppointments, setAllAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [schedule, setSchedule] = useState({
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        timeStart: '09:00',
        timeEnd: '17:00'
    });

    const [stats, setStats] = useState([
        { label: 'Total Patients', value: '0', icon: '👥', color: 'var(--primary-500)', trend: 'Loading...' },
        { label: 'Appointments Today', value: '0', icon: '📅', color: 'var(--accent-500)', trend: 'Loading...' },
        { label: 'Pending Reviews', value: '0', icon: '📝', color: 'var(--warning)', trend: 'Loading...' },
        { label: 'Average Rating', value: '0', icon: '⭐', color: 'var(--purple-500)', trend: 'Loading...' }
    ]);

    // Fetch data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.defaults.withCredentials = true;

                // Fetch today's appointments
                const aptsRes = await axios.get(backendUrl + '/api/appointments/doctor/today');
                if (aptsRes.data.success) {
                    setTodaysAppointments(aptsRes.data.appointments.map(a => ({
                        id: a._id,
                        patient: a.patientName,
                        time: a.time,
                        reason: a.reason || 'Checkup',
                        status: a.status,
                        type: a.type
                    })));
                }

                // Fetch all appointments
                const allAptsRes = await axios.get(backendUrl + '/api/doctors/my/appointments');
                if (allAptsRes.data.success) {
                    setAllAppointments(allAptsRes.data.appointments);
                }

                // Fetch patients
                const patientsRes = await axios.get(backendUrl + '/api/doctors/my/patients');
                if (patientsRes.data.success) {
                    setPatients(patientsRes.data.patients);
                }

                // Fetch doctor stats
                const statsRes = await axios.get(backendUrl + '/api/doctors/my/stats');
                if (statsRes.data.success) {
                    const s = statsRes.data.stats;
                    setStats([
                        { label: 'Total Patients', value: s.totalPatients?.toLocaleString() || '0', icon: '👥', color: 'var(--primary-500)', trend: '+12%' },
                        { label: 'Appointments Today', value: String(s.todaysAppointments || 0), icon: '📅', color: 'var(--accent-500)', trend: s.todaysAppointments > 5 ? 'Busy' : 'Normal' },
                        { label: 'Pending Reviews', value: String(s.pendingReviews || 0), icon: '📝', color: 'var(--warning)', trend: s.pendingReviews > 0 ? 'Urgent' : 'Clear' },
                        { label: 'Average Rating', value: String(s.rating || 4.5), icon: '⭐', color: 'var(--purple-500)', trend: 'Excellent' }
                    ]);
                }

            } catch (error) {
                console.error("Failed to fetch doctor data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [backendUrl]);

    const handleGenerateBrief = async (patientName, reason, id) => {
        setBriefLoadingPt(id);
        try {
            const response = await axios.post(backendUrl + '/api/gemini/patient-brief', {
                patientName,
                reason
            });
            if (response.data.success) {
                setBriefData({ ...response.data.data, patientName });
                setBriefModalOpen(true);
            }
        } catch (error) {
            console.error("Failed to generate brief", error);
            toast.error("Failed to generate patient brief");
        } finally {
            setBriefLoadingPt(null);
        }
    };
>>>>>>> 8c70b3d4493c216c31bc7bc7745c1bd6bd742940

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

<<<<<<< HEAD
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
=======
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <button className="btn-icon" style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', position: 'relative' }}>
                            🔔
                            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'var(--error)', borderRadius: '50%' }}></span>
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--accent-500), var(--primary-500))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>
                                DS
                            </div>
                            <div className="hide-mobile" style={{ lineHeight: 1.2 }}>
                                <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>Dr. Sarah</div>
                                <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>Cardiologist</div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Sidebar */}
                <aside style={{ width: '260px', background: 'rgba(30, 41, 59, 0.4)', borderRight: '1px solid rgba(255, 255, 255, 0.05)', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }} className="hide-mobile">
                    {['dashboard', 'appointments', 'patients', 'schedule', 'messages', 'settings'].map(id => (
                        <div key={id} onClick={() => setActiveTab(id)} style={{ padding: '0.875rem 1rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', color: activeTab === id ? 'white' : 'rgba(255, 255, 255, 0.6)', background: activeTab === id ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.2), transparent)' : 'transparent', borderLeft: activeTab === id ? '3px solid var(--accent-500)' : '3px solid transparent', transition: 'all 0.3s ease' }}>
                            <span style={{ fontSize: '1.2rem' }}>{id === 'dashboard' ? '📊' : id === 'appointments' ? '📅' : id === 'patients' ? '👥' : id === 'schedule' ? '⏳' : id === 'messages' ? '💬' : '⚙️'}</span>
                            <span style={{ fontWeight: 500 }}>{id.charAt(0).toUpperCase() + id.slice(1)}</span>
                        </div>
                    ))}
                    <div style={{ marginTop: 'auto' }}>
                        <div onClick={logout} style={{ padding: '0.875rem 1rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--coral-400)', transition: 'all 0.3s ease' }}>
                            <span style={{ fontSize: '1.2rem' }}>🚪</span>
                            <span style={{ fontWeight: 500 }}>Logout</span>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main style={{ flex: 1, overflowY: 'auto', padding: '2rem', background: 'radial-gradient(circle at top left, rgba(16, 185, 129, 0.1), transparent 40%)' }}>
                    <div className="container-custom" style={{ maxWidth: '1200px', margin: '0 0', padding: 0 }}>

                        {activeTab === 'dashboard' && (
                            <>
                                {/* Welcome Header */}
                                <div className="animate-fadeInUp" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                                    <div>
                                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Doctor Dashboard</h1>
                                        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.1rem' }}>Manage your schedule and patient care efficiently.</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem' }} onClick={() => setActiveTab('schedule')}><span>📅</span> Manage Schedule</button>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="animate-fadeInUp stagger-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                    {stats.map((stat, i) => (
                                        <div key={i} className="glass-effect hover-lift" style={{ padding: '1.5rem', borderRadius: '20px', background: 'rgba(30, 41, 59, 0.6)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `rgba(255, 255, 255, 0.05)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>{stat.icon}</div>
                                                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent-400)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>{stat.trend}</span>
                                            </div>
                                            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>{stat.value}</h3>
                                            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>{stat.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Today's Appointments */}
                                <div className="animate-fadeInUp stagger-2" style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(20px)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>Today's Appointments</h2>
                                        <span style={{ color: 'var(--accent-400)', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 600 }} onClick={() => setActiveTab('appointments')}>View Calendar</span>
                                    </div>

                                    <div className="table-container" style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
                                        <div className="table-header" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '1rem', display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.5fr', padding: '1rem' }}>
                                            <div>Patient</div>
                                            <div>Reason</div>
                                            <div>Time</div>
                                            <div>Type</div>
                                            <div>Action</div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {todaysAppointments.length === 0 ? (
                                                <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>No appointments today</div>
                                            ) : (
                                                todaysAppointments.map(apt => (
                                                    <div key={apt.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.5fr', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', alignItems: 'center', transition: 'background 0.2s' }} className="hover:bg-white/5">
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--neutral-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>{apt.patient.split(' ')[0][0]}</div>
                                                            <span style={{ fontWeight: 600, color: 'white' }}>{apt.patient}</span>
                                                        </div>
                                                        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{apt.reason}</div>
                                                        <div style={{ fontWeight: 600, color: 'white' }}>{apt.time}</div>
                                                        <div><span className={`badge ${apt.type === 'Video' ? 'badge-purple' : 'badge-info'}`}>{apt.type}</span></div>
                                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                            <button className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>View</button>
                                                            <button
                                                                className="btn-secondary"
                                                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'linear-gradient(135deg, #ec4899, #d946ef)', border: 'none' }}
                                                                onClick={() => handleGenerateBrief(apt.patient, apt.reason, apt.id)}
                                                                disabled={briefLoadingPt === apt.id}
                                                            >
                                                                {briefLoadingPt === apt.id ? '⌛' : '✨ Brief'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'appointments' && (
                            <div className="animate-fadeInUp">
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '2rem' }}>All Appointments</h2>
                                <div className="glass-effect" style={{ borderRadius: '24px', overflow: 'hidden', background: 'rgba(30, 41, 59, 0.6)' }}>
                                    <div className="table-header" style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 1fr', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
                                        <div>Patient</div>
                                        <div>Reason</div>
                                        <div>Date</div>
                                        <div>Time</div>
                                        <div>Type</div>
                                        <div>Status</div>
                                    </div>
                                    {allAppointments.length === 0 ? (
                                        <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>No appointments found.</div>
                                    ) : (
                                        allAppointments.map((apt, i) => (
                                            <div key={apt._id || i} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 1fr', padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'center' }} className="hover:bg-white/5">
                                                <div style={{ fontWeight: 600, color: 'white' }}>{apt.patientName}</div>
                                                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{apt.reason || 'Checkup'}</div>
                                                <div style={{ color: 'white' }}>{new Date(apt.date).toLocaleDateString()}</div>
                                                <div style={{ color: 'white' }}>{apt.time}</div>
                                                <div><span className={`badge ${apt.type === 'Video' ? 'badge-purple' : 'badge-info'}`}>{apt.type}</span></div>
                                                <div>
                                                    <span style={{
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: '12px',
                                                        fontSize: '0.85rem',
                                                        fontWeight: 600,
                                                        background: apt.status === 'confirmed' ? 'rgba(16, 185, 129, 0.1)' : apt.status === 'cancelled' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                                        color: apt.status === 'confirmed' ? '#34d399' : apt.status === 'cancelled' ? '#f87171' : '#fbbf24'
                                                    }}>
                                                        {apt.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'patients' && (
                            <div className="animate-fadeInUp">
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '2rem' }}>My Patients</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                    {patients.length === 0 ? (
                                        <div style={{ gridColumn: '1/-1', padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>No patients found.</div>
                                    ) : (
                                        patients.map((patient, i) => (
                                            <div key={patient._id || i} className="glass-effect hover-lift" style={{ padding: '1.5rem', borderRadius: '24px', background: 'rgba(30, 41, 59, 0.6)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white' }}>
                                                        {patient.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>{patient.name}</h3>
                                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{patient.email}</p>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '12px' }}>
                                                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Gender</div>
                                                        <div style={{ color: 'white' }}>{patient.gender || 'N/A'}</div>
                                                    </div>
                                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '12px' }}>
                                                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>DOB</div>
                                                        <div style={{ color: 'white' }}>{patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'N/A'}</div>
                                                    </div>
                                                </div>
                                                <button className="btn-outline" style={{ width: '100%', marginTop: '1.5rem' }}>View History</button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'schedule' && (
                            <div className="animate-fadeInUp">
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '2rem' }}>Manage Schedule</h2>
                                <div className="glass-effect" style={{ padding: '2rem', borderRadius: '24px', background: 'rgba(30, 41, 59, 0.6)' }}>
                                    <div style={{ marginBottom: '2rem' }}>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>Available Days</h3>
                                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                                <button
                                                    key={day}
                                                    className={`btn-outline ${schedule.days.includes(day) ? 'active' : ''}`}
                                                    style={{
                                                        background: schedule.days.includes(day) ? 'var(--primary-500)' : 'transparent',
                                                        borderColor: schedule.days.includes(day) ? 'var(--primary-500)' : 'rgba(255,255,255,0.2)',
                                                        color: 'white'
                                                    }}
                                                    onClick={() => {
                                                        const newDays = schedule.days.includes(day)
                                                            ? schedule.days.filter(d => d !== day)
                                                            : [...schedule.days, day];
                                                        setSchedule({ ...schedule, days: newDays });
                                                    }}
                                                >
                                                    {day}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                        <div>
                                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>Start Time</label>
                                            <input
                                                type="time"
                                                className="input-field"
                                                value={schedule.timeStart}
                                                onChange={(e) => setSchedule({ ...schedule, timeStart: e.target.value })}
                                                style={{ background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>End Time</label>
                                            <input
                                                type="time"
                                                className="input-field"
                                                value={schedule.timeEnd}
                                                onChange={(e) => setSchedule({ ...schedule, timeEnd: e.target.value })}
                                                style={{ background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                                            />
                                        </div>
                                    </div>
                                    <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={() => toast.success("Schedule updated successfully!")}>
                                        Save Schedule
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'messages' && (
                            <div className="animate-fadeInUp" style={{ textAlign: 'center', padding: '4rem' }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💬</div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>Messages</h2>
                                <p style={{ color: 'rgba(255,255,255,0.6)' }}>Messaging feature is coming soon!</p>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="animate-fadeInUp">
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '2rem' }}>Settings</h2>
                                <div className="glass-effect" style={{ padding: '2rem', borderRadius: '24px', background: 'rgba(30, 41, 59, 0.6)' }}>
                                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>Profile settings and account management.</p>
                                    <button className="btn-secondary" style={{ marginTop: '1rem' }} onClick={logout}>Logout</button>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* AI Brief Modal */}
            {briefModalOpen && briefData && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setBriefModalOpen(false)}>
                    <div style={{ width: '90%', maxWidth: '600px', background: '#1e293b', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(236, 72, 153, 0.3)', boxShadow: '0 0 50px rgba(236, 72, 153, 0.2)' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '2rem' }}>✨</div>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>Patient Brief</h2>
                                <p style={{ color: 'rgba(255,255,255,0.6)' }}>AI Summary for {briefData.patientName}</p>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: '#f472b6', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Overview</h3>
                            <p style={{ color: 'white', lineHeight: '1.6' }}>{briefData.summary}</p>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Medical History Context</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {briefData.history.map((point, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                                        <span style={{ color: '#34d399' }}>•</span> {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #3b82f6' }}>
                            <h3 style={{ color: '#60a5fa', fontSize: '1rem', marginBottom: '0.25rem', fontWeight: 600 }}>Suggested Questions</h3>
                            <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem' }}>
                                {briefData.questions.map((q, i) => (
                                    <li key={i} style={{ marginBottom: '0.3rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>❓ {q}</li>
                                ))}
                            </ul>
                        </div>

                        <button className="btn-primary" style={{ width: '100%', marginTop: '2rem', background: '#ec4899' }} onClick={() => setBriefModalOpen(false)}>
                            Close Briefing
                        </button>
                    </div>
                </div>
            )}
>>>>>>> 8c70b3d4493c216c31bc7bc7745c1bd6bd742940
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
