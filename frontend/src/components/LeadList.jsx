import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import StageFilter from "./StageFilter";
import PipelineSummary from "./PipelineSummary";

export default function LeadList() {
  const [leads, setLeads] = useState([]);
  const [stage, setStage] =useState("All");
  const [search, setSearch] = useState("");

  const load = async () => {
    try {
      const res = await API.get("/leads");
      setLeads(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch {
      setLeads([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredLeads = leads.filter((lead) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      lead.leadName?.toLowerCase().includes(keyword) ||
      lead.businessName?.toLowerCase().includes(keyword) ||
      lead.service?.toLowerCase().includes(keyword) ||
      lead.city?.toLowerCase().includes(keyword) ||
      lead.owner?.toLowerCase().includes(keyword);

    const matchesStage =
      stage === "All" || lead.stage === stage;

    return matchesSearch && matchesStage;
  });

  const badgeColor = (stage) => {
    switch (stage) {
      case "New":
        return "bg-primary text-dark";
      case "Contacted":
        return "bg-warning text-dark";
      case "Proposal Sent":
        return "bg-info text-dark";
      case "Negotiation":
        return "bg-secondary text-dark";
      case "Closed Won":
        return "bg-success text-dark";
      case "Closed Lost":
        return "bg-danger text-dark";
      default:
        return "bg-dark text-dark";
    }
  };

  return (
    <div className="container-fluid py-4">

      <PipelineSummary
        data={leads}
        selectedStage={stage}
        onStageClick={setStage}
      />

      <div className="mt-4">
        <StageFilter
          value={stage}
          onChange={setStage}
          search={search}
          onSearchChange={setSearch}
        />
      </div>

      <div className="card border-0 shadow-lg rounded-4 mt-4">

        <div className="card-header bg-white border-0 py-3">
          <h5 className="fw-bold mb-0">
            Leads ({filteredLeads.length})
          </h5>
        </div>

        <div className="table-responsive">

          <table className="table align-middle table-hover mb-0">

            <thead className="table-light">
              <tr>
                <th>Lead</th>
                <th>Business</th>
                <th>Service</th>
                <th>City</th>
                <th>Budget</th>
                <th>Stage</th>
                <th>Owner</th>
                <th>Updated</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredLeads.length ? (
                filteredLeads.map((l) => (
                  <tr key={l._id}>

                    <td>
                      <div className="fw-semibold">
                        {l.leadName}
                      </div>
                    </td>

                    <td>{l.businessName}</td>

                    <td>
                      <span className="badge bg-light text-dark border">
                        {l.service}
                      </span>
                    </td>

                    <td>{l.city}</td>

                    <td className="fw-bold text-success">
                      ₹{l.monthlyBudget?.toLocaleString()}
                    </td>

                    <td>
                      <span className={`badge rounded-pill px-3 py-2 ${badgeColor(l.stage)}`}>
                        {l.stage}
                      </span>
                    </td>

                    <td>{l.owner}</td>

                    <td>
                      {l.updatedAt
                        ? new Date(l.updatedAt).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="text-center">

                      <Link
                        to={`/lead/${l._id}`}
                        className="btn btn-outline-primary btn-sm rounded-pill px-3"
                      >
                        View
                      </Link>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-5">
                    <h5>No Leads Found</h5>
                    <small className="text-muted">
                      Try changing the search or stage.
                    </small>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}