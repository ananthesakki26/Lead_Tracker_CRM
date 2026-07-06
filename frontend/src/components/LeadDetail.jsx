import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

const STAGES = [
  "New",
  "Contacted",
  "Proposal Sent",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
];

export default function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [l, setL] = useState(null);

  useEffect(() => {
    API.get(`/leads/${id}`)
      .then((res) => setL(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!l) return <p className="text-center mt-4">Loading...</p>;

  // Save Lead
  const saveLead = async () => {
    try {
      await API.put(`/leads/${id}`, l);
      alert("Lead updated successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to update lead.");
    }
  };

  // Delete Lead
  const deleteLead = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/leads/${id}`);
      alert("Lead deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete lead.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">

        {/* Back Button */}
        <div className="mb-3">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate("/")}
          >
            ← Back
          </button>
        </div>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            {l.leadName}
            <small className="text-muted">
              {" "}
              — {l.businessName}
            </small>
          </h4>

          <button
            className="btn btn-outline-danger"
            onClick={deleteLead}
          >
            Delete
          </button>
        </div>

        <hr />

        <div className="row g-3">

          <div className="col-md-4">
            <label className="form-label">Service</label>
            <input
              type="text"
              className="form-control"
              value={l.service || ""}
              onChange={(e) =>
                setL({ ...l, service: e.target.value })
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              value={l.city || ""}
              onChange={(e) =>
                setL({ ...l, city: e.target.value })
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Monthly Budget</label>
            <input
              type="number"
              className="form-control"
              value={l.monthlyBudget || ""}
              onChange={(e) =>
                setL({
                  ...l,
                  monthlyBudget: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Owner</label>
            <input
              type="text"
              className="form-control"
              value={l.owner || ""}
              onChange={(e) =>
                setL({ ...l, owner: e.target.value })
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Priority</label>
            <input
              type="text"
              className="form-control"
              value={l.priority || ""}
              onChange={(e) =>
                setL({ ...l, priority: e.target.value })
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Source</label>
            <input
              type="text"
              className="form-control"
              value={l.source || ""}
              onChange={(e) =>
                setL({ ...l, source: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Stage</label>
            <select
              className="form-select"
              value={l.stage}
              onChange={(e) =>
                setL({ ...l, stage: e.target.value })
              }
            >
              {STAGES.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Next Follow-up</label>
            <input
              type="date"
              className="form-control"
              value={
                l.nextFollowUp
                  ? l.nextFollowUp.substring(0, 10)
                  : ""
              }
              onChange={(e) =>
                setL({
                  ...l,
                  nextFollowUp: e.target.value,
                })
              }
            />
          </div>

          <div className="col-12">
            <label className="form-label">Notes</label>
            <textarea
              rows="5"
              className="form-control"
              value={l.notes || ""}
              onChange={(e) =>
                setL({ ...l, notes: e.target.value })
              }
            ></textarea>
          </div>

        </div>

        <hr />

        {/* Action Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-success"
            onClick={saveLead}
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}