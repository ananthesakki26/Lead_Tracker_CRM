require("dotenv").config();
const connectDB = require("./config/db");
const Lead = require("./models/Lead");

const data = [
  { leadName: "Rahul Sharma", businessName: "UrbanFit Gym", service: "Meta Ads", city: "Mumbai", monthlyBudget: 80000, stage: "Proposal Sent", owner: "Anita", priority: "High", notes: "Wants case studies from fitness niche." },
  { leadName: "Priya Verma", businessName: "Verma Jewels", service: "Google Ads", city: "Delhi", monthlyBudget: 150000, stage: "Negotiation", owner: "Karan", priority: "High" },
  { leadName: "Arjun Nair", businessName: "Nair Realty", service: "SEO", city: "Bangalore", monthlyBudget: 40000, stage: "Contacted", owner: "Anita" },
  { leadName: "Sneha Iyer", businessName: "Bloom Cafe", service: "Meta Ads", city: "Chennai", monthlyBudget: 25000, stage: "New", owner: "Karan", priority: "Low" },
  { leadName: "Vikram Singh", businessName: "Singh Motors", service: "Google Ads", city: "Jaipur", monthlyBudget: 200000, stage: "Closed Won", owner: "Anita" },
  { leadName: "Meera Das", businessName: "Das Boutique", service: "Meta Ads", city: "Kolkata", monthlyBudget: 15000, stage: "Closed Lost", owner: "Karan" },
];

(async () => {
  await connectDB();
  await Lead.deleteMany({});
  await Lead.insertMany(data);
  console.log("✅ Seeded");
  process.exit(0);
})();
