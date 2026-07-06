import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LeadList from "./components/LeadList";
import LeadForm from "./components/LeadForm";
import LeadDetail from "./components/LeadDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<LeadList />} />
          <Route path="/new" element={<LeadForm />} />
          <Route path="/lead/:id" element={<LeadDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
