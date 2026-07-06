import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const SERVICES = [
  "Meta Ads",
  "Google Ads",
  "SEO",
  "Web Design",
  "Content",
  "Other",
];

export default function LeadForm() {
  const nav = useNavigate();

  const [f, setF] = useState({
    leadName: "",
    businessName: "",
    service: "Meta Ads",
    city: "",
    monthlyBudget: "",
    owner: "",
    priority: "Medium",
    source: "WhatsApp",
  });

  const on = (e) => {
    setF({
      ...f,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/leads", f);
    console.log(res.data);
    nav("/");
  } catch (err) {
    console.log(err.response);
    console.log(err.response?.data);
    alert(JSON.stringify(err.response?.data || err.message));
  }
};

  return (
    <form
      onSubmit={submit}
      className="card p-4"
      style={{ maxWidth: 600, margin: "0 auto" }}
    >
      <div className="mb-3">
    <button
      type="button"
      className="btn btn-outline-secondary btn-sm"
      onClick={() => nav(-1)}
    >
      ← Back
    </button>
  </div>
      <h4 className="mb-3">Add New Lead</h4>



      <div className="row g-3">
        <div className="col-md-6">
          <label>Lead Name *</label>
          <input
            required
            name="leadName"
            className="form-control"
            value={f.leadName}
            onChange={on}
          />
        </div>

        <div className="col-md-6">
          <label>Business *</label>
          <input
            required
            name="businessName"
            className="form-control"
            value={f.businessName}
            onChange={on}
          />
        </div>

        <div className="col-md-6">
          <label>Service *</label>
          <select
            name="service"
            className="form-select"
            value={f.service}
            onChange={on}
          >
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label>City *</label>
          <input
            required
            name="city"
            className="form-control"
            value={f.city}
            onChange={on}
          />
        </div>

        <div className="col-md-6">
          <label>Monthly Budget (₹)</label>
          <input
            type="number"
            name="monthlyBudget"
            className="form-control"
            value={f.monthlyBudget}
            onChange={on}
          />
        </div>

        <div className="col-md-6">
          <label>Owner *</label>
          <input
            required
            name="owner"
            className="form-control"
            value={f.owner}
            onChange={on}
          />
        </div>

        <div className="col-md-6">
          <label>Priority</label>
          <select
            name="priority"
            className="form-select"
            value={f.priority}
            onChange={on}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="col-md-6">
          <label>Source</label>
          <input
            name="source"
            className="form-control"
            value={f.source}
            onChange={on}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-4">
        Save Lead
      </button>
    </form>
  );
}