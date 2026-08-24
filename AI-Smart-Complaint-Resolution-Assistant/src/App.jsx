import { useState } from "react";
import MyComplaints from "./pages/MyComplaints";

// =====================================================
// QUICK ACTIONS
// =====================================================

const quickActions = [
  {
    icon: "🏠",
    label: "Hostel",
    text: "I have a hostel-related complaint.",
  },
  {
    icon: "💻",
    label: "IT Support",
    text: "I have an IT-related problem.",
  },
  {
    icon: "🚌",
    label: "Transport",
    text: "I have a transport-related complaint.",
  },
  {
    icon: "📚",
    label: "Academic",
    text: "I have an academic-related complaint.",
  },
  {
    icon: "🔧",
    label: "Maintenance",
    text: "I have a maintenance complaint.",
  },
  {
    icon: "💳",
    label: "Accounts",
    text: "I have an accounts-related complaint.",
  },
];

// =====================================================
// INITIAL CHAT MESSAGES
// =====================================================

const initialMessages = [
  {
    id: 1,
    sender: "ai",
    text: "Hello! 👋 I'm your AI Complaint Assistant.",
  },
  {
    id: 2,
    sender: "ai",
    text: "Tell me about your problem and I'll help route it to the right department.",
  },
];

// =====================================================
// DASHBOARD
// =====================================================

function Dashboard({ complaints }) {
  const total = complaints.length;

  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const highPriority = complaints.filter(
    (c) => c.priority === "High"
  ).length;

  return (
    <section className="flex-1 overflow-y-auto p-5 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            📊 Dashboard
          </h2>

          <p className="text-slate-400 mt-2">
            Overview of your complaint activity
          </p>
        </div>

        {/* STATISTICS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Total */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Total Complaints
              </p>

              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                🎫
              </div>
            </div>

            <p className="text-3xl font-bold mt-4">
              {total}
            </p>

            <p className="text-xs text-indigo-400 mt-2">
              All submitted complaints
            </p>
          </div>

          {/* Pending */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Pending
              </p>

              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                🟡
              </div>
            </div>

            <p className="text-3xl font-bold text-yellow-400 mt-4">
              {pending}
            </p>

            <p className="text-xs text-slate-500 mt-2">
              Awaiting resolution
            </p>
          </div>

          {/* Resolved */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Resolved
              </p>

              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                ✅
              </div>
            </div>

            <p className="text-3xl font-bold text-green-400 mt-4">
              {resolved}
            </p>

            <p className="text-xs text-slate-500 mt-2">
              Successfully resolved
            </p>
          </div>

          {/* High Priority */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                High Priority
              </p>

              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                🔴
              </div>
            </div>

            <p className="text-3xl font-bold text-red-400 mt-4">
              {highPriority}
            </p>

            <p className="text-xs text-slate-500 mt-2">
              Need attention
            </p>
          </div>

        </div>

        {/* RECENT COMPLAINTS */}

        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-5">

          <div className="mb-5">
            <h3 className="font-semibold text-lg">
              Recent Complaints
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              Your latest submitted complaints
            </p>
          </div>

          {complaints.length === 0 ? (

            <div className="text-center py-12">

              <div className="text-5xl mb-4">
                📭
              </div>

              <p className="text-slate-400">
                No complaints submitted yet.
              </p>

              <p className="text-xs text-slate-600 mt-2">
                Submit a complaint to see it here.
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {complaints
                .slice()
                .reverse()
                .slice(0, 5)
                .map((complaint) => (

                  <div
                    key={complaint.id}
                    className="bg-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >

                    <div className="min-w-0">

                      <p className="font-semibold text-indigo-400">
                        {complaint.id}
                      </p>

                      <p className="text-sm mt-1 truncate">
                        {complaint.complaint}
                      </p>

                      <p className="text-xs text-slate-500 mt-2">
                        {complaint.category}
                        {" • "}
                        {complaint.department}
                      </p>

                    </div>

                    <div className="flex items-center gap-2 shrink-0">

                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          complaint.priority === "High"
                            ? "bg-red-500/10 text-red-400"
                            : complaint.priority === "Medium"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-green-500/10 text-green-400"
                        }`}
                      >
                        {complaint.priority}
                      </span>

                      <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400">
                        {complaint.status}
                      </span>

                    </div>

                  </div>

                ))}

            </div>

          )}

        </div>

      </div>
    </section>
  );
}

// =====================================================
// SETTINGS
// =====================================================

function Settings({ settings, setSettings }) {
  return (
    <section className="flex-1 overflow-y-auto p-5 md:p-8">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <h2 className="text-2xl md:text-3xl font-bold">
            ⚙️ Settings
          </h2>

          <p className="text-slate-400 mt-2">
            Manage your complaint assistant preferences
          </p>

        </div>

        {/* ACCOUNT */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-5">

          <h3 className="font-semibold text-lg mb-5">
            Account
          </h3>

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold">
              K
            </div>

            <div>

              <p className="font-medium">
                Student
              </p>

              <p className="text-sm text-slate-400">
                User Account
              </p>

            </div>

          </div>

        </div>

        {/* NOTIFICATIONS */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-5">

          <h3 className="font-semibold text-lg mb-5">
            Notifications
          </h3>

          <div className="space-y-6">

            {/* Push Notifications */}

            <label className="flex items-center justify-between gap-5 cursor-pointer">

              <div>

                <p className="text-sm font-medium">
                  Push Notifications
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Receive updates about your complaints
                </p>

              </div>

              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notifications: e.target.checked,
                  })
                }
                className="w-5 h-5 accent-indigo-600"
              />

            </label>

            {/* Email Alerts */}

            <label className="flex items-center justify-between gap-5 cursor-pointer">

              <div>

                <p className="text-sm font-medium">
                  Email Alerts
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Receive complaint registration email notifications
                </p>

              </div>

              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    emailAlerts: e.target.checked,
                  })
                }
                className="w-5 h-5 accent-indigo-600"
              />

            </label>

          </div>

        </div>

        {/* ABOUT */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h3 className="font-semibold text-lg mb-3">
            About
          </h3>

          <p className="text-sm text-slate-400 leading-6">
            AI Smart Complaint & Resolution Assistant
            helps students submit complaints, classify
            them into appropriate departments, assign
            priority levels, generate ticket IDs and
            track complaint status.
          </p>

          <div className="mt-5 pt-4 border-t border-slate-800">

            <p className="text-xs text-slate-600">
              Version 1.0 • Minor Project
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

// =====================================================
// MAIN APP
// =====================================================

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
  localStorage.getItem("isLoggedIn") === "true"
);

const [username, setUsername] = useState(
  localStorage.getItem("username") || ""
);

const [loginUsername, setLoginUsername] = useState("");
const [loginPassword, setLoginPassword] = useState("");
const [loginError, setLoginError] = useState("");
  // Navigation

  const [activePage, setActivePage] = useState("new");

  // Complaints

  const [complaints, setComplaints] = useState([]);

  // Chat

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Analysis

  const [showAnalysis, setShowAnalysis] = useState(null);

  // Ticket

  const [ticket, setTicket] = useState(null);

  // Track Complaint

  const [showTrack, setShowTrack] = useState(false);
  const [trackId, setTrackId] = useState("");
  const [trackedTicket, setTrackedTicket] = useState(null);
  const [trackError, setTrackError] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  // Settings

  const [settings, setSettings] = useState({
    notifications: true,
    emailAerts: true,
  });
  const handleLogin = (e) => {
  e.preventDefault();

  if (!loginUsername.trim() || !loginPassword.trim()) {
    setLoginError("Please enter username and password.");
    return;
  }

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", loginUsername.trim());

  setUsername(loginUsername.trim());
  setIsLoggedIn(true);
  setLoginError("");
};

const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");

  setIsLoggedIn(false);
  setUsername("");
  setLoginUsername("");
  setLoginPassword("");
  setActivePage("new");
};

  // ===================================================
  // SEND MESSAGE
  // ===================================================

  const sendMessage = async (messageText = input) => {

    const text = messageText.trim();

    if (!text || isTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");
    setIsTyping(true);
    setShowAnalysis(null);
    setTicket(null);

    try {

      const response = await fetch(
        "https://ai-smart-complaint-resolution-assistant-7.onrender.com/api/complaints/analyze",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            complaint: text,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong"
        );
      }

      setShowAnalysis(data.analysis);

      setIsTyping(false);

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: "I've analysed your complaint. Here is what I understood:",
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

    } catch (error) {

      console.error("API Error:", error);

      setIsTyping(false);

      const errorMessage = {
        id: Date.now() + 2,
        sender: "ai",
        text: "Sorry, I couldn't analyse your complaint right now. Please make sure the backend server is running on port 5000.",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    }
  };

  // ===================================================
  // ENTER KEY
  // ===================================================

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      sendMessage();
    }

  };

  // ===================================================
  // SUBMIT COMPLAINT
  // ===================================================

  const submitComplaint = async () => {

    if (!showAnalysis) return;

    try {

      const response = await fetch(
        "https://ai-smart-complaint-resolution-assistant-7.onrender.com/api/complaints/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            complaint: showAnalysis.summary,
            category: showAnalysis.category,
            department: showAnalysis.department,
            priority: showAnalysis.priority,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to register complaint"
        );
      }

      const registeredTicket = data.ticket;

      // Save complaint

      setComplaints((prev) => [
        ...prev,
        registeredTicket,
      ]);

      // Confirmation message

      const confirmationMessage = {
        id: Date.now(),
        sender: "ai",
        text: `Your complaint has been successfully registered! 🎉 Your ticket ID is ${registeredTicket.id}.`,
      };

      setMessages((prev) => [
        ...prev,
        confirmationMessage,
      ]);

      // Show ticket

      setTicket(registeredTicket);

      // Hide analysis

      setShowAnalysis(null);

    } catch (error) {

      console.error(
        "Complaint Registration Error:",
        error
      );

      const errorMessage = {
        id: Date.now(),
        sender: "ai",
        text: "❌ Unable to register your complaint. Please try again.",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    }
  };

  // ===================================================
  // TRACK COMPLAINT
  // ===================================================

  const trackComplaint = async () => {

    if (!trackId.trim()) return;

    setIsTracking(true);
    setTrackError("");
    setTrackedTicket(null);

    try {

      const response = await fetch(
        `https://ai-smart-complaint-resolution-assistant-7.onrender.com/api/complaints/${trackId.trim()}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Ticket not found"
        );
      }

      setTrackedTicket(data.ticket);

    } catch (error) {

      console.error(
        "Tracking Error:",
        error
      );

      setTrackError(
        error.message || "Unable to track complaint"
      );

    } finally {

      setIsTracking(false);

    }
  };

  // ===================================================
  // RENDER
  // ===================================================
  if (!isLoggedIn) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo */}

        <div className="text-center mb-8">

          <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-4xl mb-4">
            🤖
          </div>

          <h1 className="text-2xl font-bold">
            Smart Complaint
          </h1>

          <p className="text-slate-400 mt-1">
            AI Complaint Assistant
          </p>

        </div>

        {/* Login Card */}

        <form
          onSubmit={handleLogin}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-7 shadow-2xl"
        >

          <h2 className="text-xl font-semibold mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-sm text-slate-400 mb-6">
            Login to manage your complaints
          </p>

          {/* Username */}

          <div className="mb-4">

            <label className="text-sm text-slate-300">
              Username
            </label>

            <input
              type="text"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition"
            />

          </div>

          {/* Password */}

          <div className="mb-5">

            <label className="text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition"
            />

          </div>

          {/* Error */}

          {loginError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-3 mb-4">
              ❌ {loginError}
            </div>
          )}

          {/* Login */}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-medium transition shadow-lg shadow-indigo-600/20"
          >
            🔐 Login
          </button>

          <p className="text-center text-xs text-slate-600 mt-5">
            Smart Complaint Resolution Assistant
          </p>

        </form>

      </div>

    </div>
  );
}



  return (

    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="hidden md:flex w-64 bg-slate-900 border-r border-slate-800 flex-col">

        {/* LOGO */}

        <div className="p-6 border-b border-slate-800">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-indigo-600/20">
              🤖
            </div>

            <div>

              <h1 className="font-bold text-sm">
                Smart Complaint
              </h1>

              <p className="text-xs text-slate-400">
                AI Assistant
              </p>

            </div>

          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="p-4 space-y-2 flex-1">

          {/* NEW COMPLAINT */}

          <button
            onClick={() => setActivePage("new")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
              activePage === "new"
                ? "bg-indigo-600 text-white"
                : "hover:bg-slate-800 text-slate-300"
            }`}
          >
            💬
            <span>New Complaint</span>
          </button>

          {/* MY COMPLAINTS */}

          <button
            onClick={() => setActivePage("complaints")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
              activePage === "complaints"
                ? "bg-indigo-600 text-white"
                : "hover:bg-slate-800 text-slate-300"
            }`}
          >
            🎫
            <span>My Complaints</span>
          </button>

          {/* DASHBOARD */}

          <button
            onClick={() => setActivePage("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
              activePage === "dashboard"
                ? "bg-indigo-600 text-white"
                : "hover:bg-slate-800 text-slate-300"
            }`}
          >
            📊
            <span>Dashboard</span>
          </button>

          {/* SETTINGS */}

          <button
            onClick={() => setActivePage("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
              activePage === "settings"
                ? "bg-indigo-600 text-white"
                : "hover:bg-slate-800 text-slate-300"
            }`}
          >
            ⚙️
            <span>Settings</span>
          </button>

        </nav>

        {/* USER */}

        <div className="p-4 border-t border-slate-800">

  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800">

    <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
      {username.charAt(0).toUpperCase()}
    </div>

    <div className="flex-1 min-w-0">

      <p className="text-sm font-medium truncate">
        {username}
      </p>

      <p className="text-xs text-slate-400">
        User Account
      </p>

    </div>

  </div>

  <button
    onClick={handleLogout}
    className="w-full mt-3 flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition"
  >
    🚪
    <span>Logout</span>
  </button>

</div>
      </aside>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="flex-1 flex flex-col min-w-0">

        {/* HEADER */}

        <header className="h-20 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-5 md:px-8">

          <div>

            <h2 className="font-semibold text-lg">
              AI Complaint Assistant
            </h2>

            <div className="flex items-center gap-2 mt-1">

              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>

              <span className="text-xs text-slate-400">
                AI Online
              </span>

            </div>

          </div>

        </header>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        {activePage === "complaints" ? (

          <MyComplaints complaints={complaints} />

        ) : activePage === "dashboard" ? (

          <Dashboard complaints={complaints} />

        ) : activePage === "settings" ? (

          <Settings
            settings={settings}
            setSettings={setSettings}
          />

        ) : (

          /* =================================================
             NEW COMPLAINT PAGE
          ================================================= */

          <section className="flex-1 overflow-y-auto p-5 md:p-8">

            <div className="max-w-4xl mx-auto">

              {/* =================================================
                  TRACK COMPLAINT
              ================================================= */}

              {showTrack && (

                <div className="mb-6">

                  <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-5">

                    <div className="flex items-center gap-3 mb-4">

                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                        🔎
                      </div>

                      <div>

                        <h3 className="font-semibold">
                          Track Your Complaint
                        </h3>

                        <p className="text-xs text-slate-400">
                          Enter your ticket ID to check the status
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-2">

                      <input
                        value={trackId}
                        onChange={(e) =>
                          setTrackId(e.target.value)
                        }
                        placeholder="Example: CMP-123456"
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500"
                      />

                      <button
                        onClick={trackComplaint}
                        disabled={
                          !trackId.trim() ||
                          isTracking
                        }
                        className="px-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 rounded-xl text-sm font-medium"
                      >
                        {isTracking
                          ? "Checking..."
                          : "Track"}
                      </button>

                    </div>

                    {trackError && (

                      <p className="text-red-400 text-sm mt-3">
                        ❌ {trackError}
                      </p>

                    )}

                    {trackedTicket && (

                      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">

                        <div className="bg-slate-800 rounded-xl p-4">
                          <p className="text-xs text-slate-400">
                            Ticket ID
                          </p>

                          <p className="font-semibold text-indigo-400 mt-1">
                            {trackedTicket.id}
                          </p>
                        </div>

                        <div className="bg-slate-800 rounded-xl p-4">
                          <p className="text-xs text-slate-400">
                            Category
                          </p>

                          <p className="font-semibold mt-1">
                            {trackedTicket.category}
                          </p>
                        </div>

                        <div className="bg-slate-800 rounded-xl p-4">
                          <p className="text-xs text-slate-400">
                            Department
                          </p>

                          <p className="font-semibold mt-1">
                            {trackedTicket.department}
                          </p>
                        </div>

                        <div className="bg-slate-800 rounded-xl p-4">
                          <p className="text-xs text-slate-400">
                            Status
                          </p>

                          <p className="font-semibold text-yellow-400 mt-1">
                            🟡 {trackedTicket.status}
                          </p>
                        </div>

                      </div>

                    )}

                  </div>

                </div>

              )}

              {/* =================================================
                  WELCOME
              ================================================= */}

              <div className="text-center mb-8">

                <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-4xl mb-5 shadow-xl shadow-indigo-600/10">
                  🤖
                </div>

                <h2 className="text-2xl md:text-3xl font-bold">
                  How can I help you today?
                </h2>

                <p className="text-slate-400 mt-2">
                  Describe your problem naturally. I'll identify
                  the right department for you.
                </p>

              </div>

              {/* =================================================
                  QUICK ACTIONS
              ================================================= */}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">

                {quickActions.map((action) => (

                  <button
                    key={action.label}
                    onClick={() =>
                      sendMessage(action.text)
                    }
                    disabled={isTyping}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-indigo-500/10 transition-all text-left disabled:opacity-50"
                  >

                    <div className="text-2xl mb-2">
                      {action.icon}
                    </div>

                    <p className="text-sm font-medium">
                      {action.label}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Report an issue
                    </p>

                  </button>

                ))}

              </div>

              {/* =================================================
                  CHAT MESSAGES
              ================================================= */}

              <div className="space-y-5">

                {messages.map((message) => (

                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`max-w-[80%] flex gap-3 ${
                        message.sender === "user"
                          ? "flex-row-reverse"
                          : ""
                      }`}
                    >

                      {/* AVATAR */}

                      <div
                        className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${
                          message.sender === "ai"
                            ? "bg-indigo-600/20"
                            : "bg-slate-800"
                        }`}
                      >
                        {message.sender === "ai"
                          ? "🤖"
                          : "👤"}
                      </div>

                      {/* MESSAGE */}

                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-indigo-600 rounded-tr-sm"
                            : "bg-slate-900 border border-slate-800 rounded-tl-sm"
                        }`}
                      >

                        <p className="text-sm leading-6">
                          {message.text}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

                {/* =================================================
                    TYPING
                ================================================= */}

                {isTyping && (

                  <div className="flex gap-3 items-center">

                    <div className="w-9 h-9 rounded-xl bg-indigo-600/20 flex items-center justify-center">
                      🤖
                    </div>

                    <div className="bg-slate-900 border border-slate-800 px-5 py-4 rounded-2xl rounded-tl-sm">

                      <div className="flex gap-1">

                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>

                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:150ms]"></span>

                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:300ms]"></span>

                      </div>

                    </div>

                  </div>

                )}

                {/* =================================================
                    AI ANALYSIS
                ================================================= */}

                {showAnalysis && (

                  <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-5 mt-6 shadow-xl shadow-indigo-500/5">

                    <div className="flex items-center gap-3 mb-5">

                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                        🧠
                      </div>

                      <div>

                        <h3 className="font-semibold">
                          AI Complaint Analysis
                        </h3>

                        <p className="text-xs text-slate-400">
                          Complaint classification completed
                        </p>

                      </div>

                    </div>

                    {/* DETAILS */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                      <div className="bg-slate-800 rounded-xl p-4">

                        <p className="text-xs text-slate-400">
                          Category
                        </p>

                        <p className="font-semibold mt-1">
                          {showAnalysis.category}
                        </p>

                      </div>

                      <div className="bg-slate-800 rounded-xl p-4">

                        <p className="text-xs text-slate-400">
                          Department
                        </p>

                        <p className="font-semibold mt-1">
                          {showAnalysis.department}
                        </p>

                      </div>

                      <div className="bg-slate-800 rounded-xl p-4">

                        <p className="text-xs text-slate-400">
                          Priority
                        </p>

                        <p
                          className={`font-semibold mt-1 ${
                            showAnalysis.priority === "High"
                              ? "text-red-400"
                              : showAnalysis.priority === "Medium"
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        >

                          {showAnalysis.priority === "High"
                            ? "🔴 High"
                            : showAnalysis.priority === "Medium"
                            ? "🟡 Medium"
                            : "🟢 Low"}

                        </p>

                      </div>

                    </div>

                    {/* SUMMARY */}

                    <div className="mt-4 bg-slate-800 rounded-xl p-4">

                      <p className="text-xs text-slate-400 mb-1">
                        Complaint Summary
                      </p>

                      <p className="text-sm">
                        {showAnalysis.summary}
                      </p>

                    </div>

                    {/* BUTTONS */}

                    <div className="flex gap-3 mt-5">

                      <button
                        onClick={submitComplaint}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl text-sm font-medium transition shadow-lg shadow-indigo-600/20"
                      >
                        ✅ Submit Complaint
                      </button>

                      <button
                        onClick={() =>
                          setShowAnalysis(null)
                        }
                        className="px-5 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-sm transition"
                      >
                        ✏️ Edit
                      </button>

                    </div>

                  </div>

                )}

                {/* =================================================
                    TICKET CARD
                ================================================= */}

                {ticket && (

                  <div className="bg-gradient-to-br from-indigo-600/20 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 mt-6">

                    <div className="text-center">

                      <div className="text-4xl mb-3">
                        🎉
                      </div>

                      <h3 className="text-xl font-bold">
                        Complaint Registered!
                      </h3>

                      <p className="text-sm text-slate-400 mt-1">
                        Your complaint has been successfully submitted.
                      </p>

                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">

                      <div className="bg-slate-900/70 rounded-xl p-4">

                        <p className="text-xs text-slate-500">
                          Ticket ID
                        </p>

                        <p className="font-semibold mt-1 text-indigo-400">
                          {ticket.id}
                        </p>

                      </div>

                      <div className="bg-slate-900/70 rounded-xl p-4">

                        <p className="text-xs text-slate-500">
                          Category
                        </p>

                        <p className="font-semibold mt-1">
                          {ticket.category}
                        </p>

                      </div>

                      <div className="bg-slate-900/70 rounded-xl p-4">

                        <p className="text-xs text-slate-500">
                          Department
                        </p>

                        <p className="font-semibold mt-1">
                          {ticket.department}
                        </p>

                      </div>

                      <div className="bg-slate-900/70 rounded-xl p-4">

                        <p className="text-xs text-slate-500">
                          Status
                        </p>

                        <p className="font-semibold mt-1 text-yellow-400">
                          🟡 {ticket.status}
                        </p>

                      </div>

                    </div>

                  </div>

                )}

              </div>

            </div>

          </section>

        )}

        {/* =================================================
            INPUT AREA
            Only show on New Complaint page
        ================================================= */}

        {activePage === "new" && (

          <div className="border-t border-slate-800 bg-slate-950 p-4 md:p-6">

            <div className="max-w-4xl mx-auto">

              <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 focus-within:border-indigo-500 rounded-2xl px-3 py-2 transition shadow-lg">

                {/* ATTACHMENT */}

                <button
                  className="w-10 h-10 rounded-xl hover:bg-slate-800 text-lg transition"
                  title="Attach image"
                >
                  📎
                </button>

                {/* INPUT */}

                <input
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  placeholder="Describe your complaint..."
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-500 px-2"
                />

                {/* VOICE */}

                <button
                  className="w-10 h-10 rounded-xl hover:bg-slate-800 text-lg transition"
                  title="Voice input"
                >
                  🎤
                </button>

                {/* SEND */}

                <button
                  onClick={() => sendMessage()}
                  disabled={
                    !input.trim() ||
                    isTyping
                  }
                  className="w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center shadow-lg shadow-indigo-600/20"
                >
                  ➤
                </button>

              </div>

              <p className="text-center text-xs text-slate-600 mt-3">
                AI-generated analysis should be verified before submission.
              </p>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default App;