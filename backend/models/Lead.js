const mongoose = require("mongoose");

const STAGES = ["New", "Contacted", "Proposal Sent", "Negotiation", "Closed Won", "Closed Lost"];
const SERVICES = ["Meta Ads", "Google Ads", "SEO", "Web Design", "Content", "Other"];

const leadSchema = new mongoose.Schema(
  {
    leadName:     { type: String, required: true, trim: true },
    businessName: { type: String, required: true, trim: true },
    service:      { type: String, enum: SERVICES, required: true },
    city:         { type: String, required: true, trim: true },
    monthlyBudget:{ type: Number, default: 0 },
    stage:        { type: String, enum: STAGES, default: "New" },
    owner:        { type: String, required: true, trim: true },
    notes:        { type: String, default: "" },
    nextFollowUp: { type: Date },
    source:       { type: String, default: "WhatsApp" },
    priority:     { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
module.exports.STAGES = STAGES;
module.exports.SERVICES = SERVICES;
