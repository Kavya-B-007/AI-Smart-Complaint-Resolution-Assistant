import { useState } from "react";
import MyComplaints from "./pages/MyComplaints";


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

function App() {
  const [activePage, setActivePage] = useState("new");
  const [complaints, setComplaints] = useState([]);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // AI analysis result
  const [showAnalysis, setShowAnalysis] = useState(null);

  // Ticket information
  const [ticket, setTicket] = useState(null);
  const [showTrack, setShowTrack] = useState(false);
  const [trackId, setTrackId] = useState("");
  const [trackedTicket, setTrackedTicket] = useState(null);
  const [trackError, setTrackError] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  // Send complaint to backend
  const sendMessage = async (messageText = input) => {
    const text = messageText.trim();

    if (!text || isTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setShowAnalysis(null);
    setTicket(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/complaints/analyze",
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
        throw new Error(data.message || "Something went wrong");
      }
      setShowAnalysis(data.analysis);
      setTicket(data.ticket);

      setIsTyping(false);

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: "I've analysed your complaint. Here is what I understood:",
      };

      setMessages((prev) => [...prev, aiMessage]);

      setTimeout(() => {
        setShowAnalysis(data.analysis);
      }, 500);
    } catch (error) {
      console.error("API Error:", error);

      setIsTyping(false);

      const errorMessage = {
        id: Date.now() + 2,
        sender: "ai",
        text: "Sorry, I couldn't analyse your complaint right now. Please make sure the backend server is running on port 5000.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Submit complaint
  // Submit complaint
const submitComplaint = async () => {
  if (!showAnalysis) return;

  try {
    const response = await fetch(
      "http://localhost:5000/api/complaints/register",
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

    // Save to My Complaints
    setComplaints((prev) => [
      ...prev,
      registeredTicket,
    ]);

    // Show confirmation message
    const confirmationMessage = {
      id: Date.now(),
      sender: "ai",
      text: `Your complaint has been successfully registered! 🎉 Your ticket ID is ${registeredTicket.id}.`,
    };

    setMessages((prev) => [
      ...prev,
      confirmationMessage,
    ]);

    // Show ticket card
    setTicket(registeredTicket);

    // Hide analysis
    setShowAnalysis(null);

  } catch (error) {
    console.error("Complaint Registration Error:", error);

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


  return (
    
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* ================= SIDEBAR ================= */}

      <aside className="hidden md:flex w-64 bg-slate-900 border-r border-slate-800 flex-col">

        {/* Logo */}

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

        {/* Navigation */}

        <nav className="p-4 space-y-2 flex-1">

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
          
          

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-sm text-slate-300 transition">
            📊
            <span>Dashboard</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-sm text-slate-300 transition">
            ⚙️
            <span>Settings</span>
          </button>

        </nav>

        {/* User */}

        <div className="p-4 border-t border-slate-800">

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800">

            <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
              K
            </div>

            <div>
              <p className="text-sm font-medium">
                Student
              </p>

              <p className="text-xs text-slate-400">
                User Account
              </p>
            </div>

          </div>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

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
        {activePage === "complaints" ? (

  <MyComplaints complaints={complaints} />

) : (

  <section className="flex-1 overflow-y-auto p-5 md:p-8">

          <div className="max-w-4xl mx-auto">
                 {showTrack && (
            <div className="max-w-4xl mx-auto mb-6">
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
          onChange={(e) => setTrackId(e.target.value)}
          placeholder="Example: CMP-123456"
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500"
        />

        <button
          onClick={trackComplaint}
          disabled={!trackId.trim() || isTracking}
          className="px-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 rounded-xl text-sm font-medium"
        >
          {isTracking ? "Checking..." : "Track"}
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
            <p className="text-xs text-slate-400">Ticket ID</p>
            <p className="font-semibold text-indigo-400 mt-1">
              {trackedTicket.id}
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400">Category</p>
            <p className="font-semibold mt-1">
              {trackedTicket.category}
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400">Department</p>
            <p className="font-semibold mt-1">
              {trackedTicket.department}
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400">Status</p>
            <p className="font-semibold text-yellow-400 mt-1">
              🟡 {trackedTicket.status}
            </p>
          </div>

        </div>
      )}
    </div>
  </div>
)}

            {/* WELCOME */}

            <div className="text-center mb-8">

              <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-4xl mb-5 shadow-xl shadow-indigo-600/10">
                🤖
              </div>

              <h2 className="text-2xl md:text-3xl font-bold">
                How can I help you today?
              </h2>

              <p className="text-slate-400 mt-2">
                Describe your problem naturally. I'll identify the
                right department for you.
              </p>

            </div>

            {/* ================= QUICK ACTIONS ================= */}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">

              {quickActions.map((action) => (

                <button
                  key={action.label}
                  onClick={() => sendMessage(action.text)}
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

            {/* ================= CHAT MESSAGES ================= */}

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

                    {/* Avatar */}

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

                    {/* Message */}

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

              {/* ================= TYPING ================= */}

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

              {/* ================= AI ANALYSIS ================= */}

              {showAnalysis && (

                <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-5 mt-6 shadow-xl shadow-indigo-500/5">

                  {/* Header */}

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

                  {/* Analysis details */}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                    {/* Category */}

                    <div className="bg-slate-800 rounded-xl p-4">

                      <p className="text-xs text-slate-400">
                        Category
                      </p>

                      <p className="font-semibold mt-1">
                        {showAnalysis.category}
                      </p>

                    </div>

                    {/* Department */}

                    <div className="bg-slate-800 rounded-xl p-4">

                      <p className="text-xs text-slate-400">
                        Department
                      </p>

                      <p className="font-semibold mt-1">
                        {showAnalysis.department}
                      </p>

                    </div>

                    {/* Priority */}

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

                  {/* Summary */}

                  <div className="mt-4 bg-slate-800 rounded-xl p-4">

                    <p className="text-xs text-slate-400 mb-1">
                      Complaint Summary
                    </p>

                    <p className="text-sm">
                      {showAnalysis.summary}
                    </p>

                  </div>

                  {/* Buttons */}

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={submitComplaint}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl text-sm font-medium transition shadow-lg shadow-indigo-600/20"
                    >
                      ✅ Submit Complaint
                    </button>

                    <button
                      onClick={() => setShowAnalysis(null)}
                      className="px-5 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-sm transition"
                    >
                      ✏️ Edit
                    </button>

                  </div>

                </div>

              )}

              {/* ================= TICKET CARD ================= */}

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

        {/* ================= INPUT ================= */}

        <div className="border-t border-slate-800 bg-slate-950 p-4 md:p-6">

          <div className="max-w-4xl mx-auto">

            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 focus-within:border-indigo-500 rounded-2xl px-3 py-2 transition shadow-lg">

              {/* Attachment */}

              <button
                className="w-10 h-10 rounded-xl hover:bg-slate-800 text-lg transition"
                title="Attach image"
              >
                📎
              </button>

              {/* Input */}

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your complaint..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-500 px-2"
              />

              {/* Voice */}

              <button
                className="w-10 h-10 rounded-xl hover:bg-slate-800 text-lg transition"
                title="Voice input"
              >
                🎤
              </button>

              {/* Send */}

              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
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

      </main>

    </div>
  );
}

export default App;