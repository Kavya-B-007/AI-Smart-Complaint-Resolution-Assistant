const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

// ================= TEMPORARY STORAGE =================

const complaints = {};

// ================= HOME =================

app.get("/", (req, res) => {
  res.json({
    message: "AI Smart Complaint Assistant Backend is running 🚀",
  });
});

// ================= HEALTH =================

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is healthy",
  });
});

// =====================================================
// ANALYZE COMPLAINT
// =====================================================

app.post("/api/complaints/analyze", (req, res) => {
  try {
    const { complaint } = req.body;

    if (!complaint || !complaint.trim()) {
      return res.status(400).json({
        success: false,
        message: "Complaint text is required",
      });
    }

    const text = complaint.toLowerCase();

    let category = "General";
    let department = "General Administration";
    let priority = "Low";

    // Hostel
    if (
      text.includes("hostel") ||
      text.includes("room") ||
      text.includes("warden") ||
      text.includes("mess") ||
      text.includes("food")
    ) {
      category = "Hostel";
      department = "Hostel Administration";
    }

    // IT
    else if (
      text.includes("computer") ||
      text.includes("wifi") ||
      text.includes("internet") ||
      text.includes("network") ||
      text.includes("software") ||
      text.includes("login") ||
      text.includes("system")
    ) {
      category = "IT Support";
      department = "IT Department";
    }

    // Transport
    else if (
      text.includes("bus") ||
      text.includes("transport") ||
      text.includes("driver") ||
      text.includes("route")
    ) {
      category = "Transport";
      department = "Transport Department";
    }

    // Academic
    else if (
      text.includes("exam") ||
      text.includes("mark") ||
      text.includes("attendance") ||
      text.includes("faculty") ||
      text.includes("class") ||
      text.includes("subject") ||
      text.includes("assignment")
    ) {
      category = "Academic";
      department = "Academic Department";
    }

    // Maintenance
    else if (
      text.includes("fan") ||
      text.includes("light") ||
      text.includes("building") ||
      text.includes("maintenance") ||
      text.includes("repair") ||
      text.includes("electricity") ||
      text.includes("door") ||
      text.includes("plumbing")
    ) {
      category = "Maintenance";
      department = "Maintenance Department";
    }

    // Accounts
    else if (
      text.includes("fee") ||
      text.includes("payment") ||
      text.includes("refund") ||
      text.includes("account") ||
      text.includes("scholarship")
    ) {
      category = "Accounts";
      department = "Accounts Department";
    }

    // Priority
    if (
      text.includes("urgent") ||
      text.includes("emergency") ||
      text.includes("danger") ||
      text.includes("immediately")
    ) {
      priority = "High";
    } else if (
      text.includes("problem") ||
      text.includes("issue") ||
      text.includes("not working")
    ) {
      priority = "Medium";
    } else {
      priority = "Low";
    }

    const analysis = {
      category,
      department,
      priority,
      summary: complaint.trim(),
    };

    res.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("Analysis Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to analyse complaint",
    });
  }
});

// =====================================================
// REGISTER COMPLAINT
// =====================================================

app.post("/api/complaints/register", (req, res) => {
  try {
    const {
      complaint,
      category,
      department,
      priority,
    } = req.body;

    if (!complaint) {
      return res.status(400).json({
        success: false,
        message: "Complaint is required",
      });
    }

    const ticketId =
      "CMP-" + Math.floor(100000 + Math.random() * 900000);

    const newComplaint = {
      id: ticketId,
      complaint: complaint,
      category: category || "General",
      department: department || "General Administration",
      priority: priority || "Medium",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    complaints[ticketId] = newComplaint;

    console.log("=================================");
    console.log("Complaint Registered");
    console.log(newComplaint);
    console.log("=================================");

    res.status(201).json({
      success: true,
      message: "Complaint registered successfully",
      ticket: newComplaint,
    });
  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to register complaint",
    });
  }
});

// =====================================================
// TRACK COMPLAINT
// =====================================================

app.get("/api/complaints/:ticketId", (req, res) => {
  try {
    const ticketId = req.params.ticketId.trim();

    const ticket = complaints[ticketId];

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.json({
      success: true,
      ticket,
    });
  } catch (error) {
    console.error("Tracking Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to track complaint",
    });
  }
});

// =====================================================
// GET ALL COMPLAINTS
// =====================================================

app.get("/api/complaints", (req, res) => {
  res.json({
    success: true,
    complaints: Object.values(complaints),
  });
});

// =====================================================
// SERVER
// =====================================================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});