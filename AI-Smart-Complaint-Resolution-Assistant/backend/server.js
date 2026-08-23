const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ================= TEMPORARY STORAGE =================

const complaints = {};

// ================= EMAIL CONFIGURATION =================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Check email connection when server starts
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email configuration error:", error.message);
  } else {
    console.log("✅ Email service is ready");
  }
});

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

    // ================= HOSTEL =================

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

    // ================= IT =================

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

    // ================= TRANSPORT =================

    else if (
      text.includes("bus") ||
      text.includes("transport") ||
      text.includes("driver") ||
      text.includes("route")
    ) {
      category = "Transport";
      department = "Transport Department";
    }

    // ================= ACADEMIC =================

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

    // ================= MAINTENANCE =================

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

    // ================= ACCOUNTS =================

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

    // ================= PRIORITY =================

    if (
      text.includes("urgent") ||
      text.includes("emergency") ||
      text.includes("danger") ||
      text.includes("immediately")
    ) {
      priority = "High";
    }

    else if (
      text.includes("problem") ||
      text.includes("issue") ||
      text.includes("not working")
    ) {
      priority = "Medium";
    }

    else {
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
// REGISTER COMPLAINT + SEND EMAIL
// =====================================================

app.post("/api/complaints/register", async (req, res) => {

  try {

    const {
      complaint,
      category,
      department,
      priority,
    } = req.body;

    if (!complaint || !complaint.trim()) {

      return res.status(400).json({
        success: false,
        message: "Complaint is required",
      });

    }

    // ================= CREATE TICKET =================

    const ticketId =
      "CMP-" + Math.floor(100000 + Math.random() * 900000);

    const newComplaint = {

      id: ticketId,

      complaint: complaint.trim(),

      category:
        category || "General",

      department:
        department || "General Administration",

      priority:
        priority || "Medium",

      status: "Pending",

      createdAt:
        new Date().toISOString(),

    };

    // ================= SAVE COMPLAINT =================

    complaints[ticketId] = newComplaint;

    console.log("=================================");
    console.log("Complaint Registered");
    console.log(newComplaint);
    console.log("=================================");

    // =================================================
    // SEND EMAIL
    // =================================================

    try {

      await transporter.sendMail({

        from: process.env.EMAIL_USER,

        to: process.env.ADMIN_EMAIL,

        subject:
          `New Complaint Registered - ${ticketId}`,

        text: `
AI SMART COMPLAINT & RESOLUTION ASSISTANT
==========================================

New Complaint Registered

Ticket ID:
${ticketId}

Complaint:
${newComplaint.complaint}

Category:
${newComplaint.category}

Department:
${newComplaint.department}

Priority:
${newComplaint.priority}

Status:
${newComplaint.status}

Created At:
${newComplaint.createdAt}

==========================================
Please review and take the necessary action.
        `,

      });

      console.log("📧 Email sent successfully");

    } catch (emailError) {

      console.error(
        "❌ Email sending failed:",
        emailError.message
      );

      // Complaint is still successfully registered
    }

    // ================= RESPONSE =================

    res.status(201).json({

      success: true,

      message:
        "Complaint registered successfully",

      ticket:
        newComplaint,

    });

  } catch (error) {

    console.error(
      "Register Error:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        "Failed to register complaint",

    });

  }

});

// =====================================================
// TRACK COMPLAINT
// =====================================================

app.get(
  "/api/complaints/:ticketId",
  (req, res) => {

    try {

      const ticketId =
        req.params.ticketId.trim();

      const ticket =
        complaints[ticketId];

      if (!ticket) {

        return res.status(404).json({

          success: false,

          message:
            "Ticket not found",

        });

      }

      res.json({

        success: true,

        ticket,

      });

    } catch (error) {

      console.error(
        "Tracking Error:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Failed to track complaint",

      });

    }

  }
);

// =====================================================
// GET ALL COMPLAINTS
// =====================================================

app.get(
  "/api/complaints",
  (req, res) => {

    res.json({

      success: true,

      complaints:
        Object.values(complaints),

    });

  }
);

// =====================================================
// SERVER
// =====================================================

app.listen(PORT, "0.0.0.0", () => {

  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );

});