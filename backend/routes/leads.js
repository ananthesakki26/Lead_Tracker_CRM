const express = require("express");
const Lead = require("../models/Lead");
const router = express.Router();

// GET all (optional ?stage=)
router.get("/", async (req, res) => {
  const filter = req.query.stage ? { stage: req.query.stage } : {};
  const leads = await Lead.find(filter).sort({ updatedAt: -1 });
  res.json(leads);
});

// GET summary count per stage
router.get("/summary", async (req, res) => {
  const summary = await Lead.aggregate([
    { $group: { _id: "$stage", count: { $sum: 1 } } },
  ]);
  res.json(summary);
});

// GET one
router.get("/:id", async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ error: "Not found" });
  res.json(lead);
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lead);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
