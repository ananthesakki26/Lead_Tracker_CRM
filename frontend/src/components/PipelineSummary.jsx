const STAGES = [
  "New",
  "Contacted",
  "Proposal Sent",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
];

export default function PipelineSummary({
  data = [],
  selectedStage,
  onStageClick,
}) {
  const summary = {};

  STAGES.forEach((stage) => {
    summary[stage] = 0;
  });

  data.forEach((lead) => {
    if (summary[lead.stage] !== undefined) {
      summary[lead.stage]++;
    }
  });

 return (
  <div className="d-flex gap-3 mb-4 flex-wrap">

    {STAGES.map((stage) => (
      <div
        key={stage}
        className={`card shadow-sm ${
          selectedStage === stage ? "border-primary border-3" : ""
        }`}
        style={{
          width: "140px",
          borderRadius: "16px",
          cursor: "pointer",
          transition: "0.3s",
        }}
        onClick={() => onStageClick(stage)}
      >
        <div className="card-body text-start">
          <h6 className="text-muted mb-2 fs-6 ">{stage}</h6>
          <h3 className="fw-bold mb-0 fs-5">{summary[stage]}</h3>
        </div>
      </div>
    ))}

    <div
      className={`card shadow-sm ${
        selectedStage === "All" ? "border-primary border-3" : ""
      }`}
      style={{
        width: "150px",
        borderRadius: "16px",
        cursor: "pointer",
        transition: "0.3s",
      }}
      onClick={() => onStageClick("All")}
    >
      <div className="card-body text-start">
        <h6 className="text-muted mb-2 fs-6">All</h6>
        <h3 className="fw-bold mb-0 fs-5">{data.length}</h3>
      </div>
    </div>

  </div>
);
} 