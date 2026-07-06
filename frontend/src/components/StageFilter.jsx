import { useState, useEffect } from "react";

export default function StageFilter({
  stage,
  onStageChange,
  search,
  onSearchChange,
}) {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">

      {/* Search Bar */}
      <div style={{ minWidth: "280px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search Lead / Business..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      

    </div>
  );
}