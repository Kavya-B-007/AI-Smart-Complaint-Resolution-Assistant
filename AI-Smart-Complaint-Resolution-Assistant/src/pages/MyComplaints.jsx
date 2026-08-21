import React from "react";

function MyComplaints({ complaints = [] }) {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-5 md:p-8 text-white">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl">
              🎫
            </div>

            <div>

              <h1 className="text-2xl md:text-3xl font-bold">
                My Complaints
              </h1>

              <p className="text-slate-400 text-sm mt-1">
                View and track all your submitted complaints.
              </p>

            </div>

          </div>

        </div>

        {/* EMPTY STATE */}

        {complaints.length === 0 ? (

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">

            <div className="text-5xl mb-4">
              📭
            </div>

            <h2 className="text-xl font-semibold">
              No Complaints Yet
            </h2>

            <p className="text-slate-400 text-sm mt-2">
              Your submitted complaints will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {complaints.map((complaint) => (

              <div
                key={complaint.id}
                className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-5 md:p-6 transition"
              >

                {/* TOP */}

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                  <div>

                    <p className="text-xs text-slate-500">
                      Complaint ID
                    </p>

                    <p className="text-indigo-400 font-semibold mt-1">
                      {complaint.id}
                    </p>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-xs font-medium w-fit ${
                      complaint.status === "Resolved"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : complaint.status === "In Progress"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    }`}
                  >
                    {complaint.status === "Pending" && "🟡 "}
                    {complaint.status === "In Progress" && "🔵 "}
                    {complaint.status === "Resolved" && "🟢 "}
                    {complaint.status}
                  </span>

                </div>

                {/* COMPLAINT */}

                <div className="mt-5 bg-slate-800 rounded-xl p-4">

                  <p className="text-xs text-slate-400 mb-2">
                    Complaint
                  </p>

                  <p className="text-sm leading-6">
                    {complaint.complaint}
                  </p>

                </div>

                {/* DETAILS */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">

                  <div className="bg-slate-800 rounded-xl p-4">

                    <p className="text-xs text-slate-400">
                      Category
                    </p>

                    <p className="font-medium mt-1">
                      {complaint.category}
                    </p>

                  </div>

                  <div className="bg-slate-800 rounded-xl p-4">

                    <p className="text-xs text-slate-400">
                      Department
                    </p>

                    <p className="font-medium mt-1">
                      {complaint.department}
                    </p>

                  </div>

                  <div className="bg-slate-800 rounded-xl p-4">

                    <p className="text-xs text-slate-400">
                      Priority
                    </p>

                    <p
                      className={`font-medium mt-1 ${
                        complaint.priority === "High"
                          ? "text-red-400"
                          : complaint.priority === "Medium"
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {complaint.priority === "High"
                        ? "🔴 High"
                        : complaint.priority === "Medium"
                        ? "🟡 Medium"
                        : "🟢 Low"}
                    </p>

                  </div>

                </div>

                {/* DATE */}

                <div className="mt-4 text-xs text-slate-500">

                  Submitted:{" "}

                  {complaint.createdAt
                    ? new Date(
                        complaint.createdAt
                      ).toLocaleString()
                    : "N/A"}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default MyComplaints;