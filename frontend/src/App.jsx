import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { RoleProvider } from "./context/RoleContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import LoanCalculator from "./pages/LoanCalculator";
import Staff from "./pages/About/Staff";

// Pages
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import Payment from "./pages/Payment";
import Login from "./pages/Login";

// About
import Team from "./pages/About/Team";
import Mission from "./pages/About/Mission";
import Partners from "./pages/About/Partners";

// Services
import Savings from "./pages/Services/Savings";
import Loans from "./pages/Services/Loans";
import Insurance from "./pages/Services/Insurance";
import Digital from "./pages/Services/Digital";

// News
import Announcements from "./pages/News/Announcements";
import Events from "./pages/News/Events";
import Vacancies from "./pages/News/Vacancies";

// Testimonials
import Documents from "./pages/Testimonials/Documents";
import Success from "./pages/Testimonials/Success";

// Media
import Gallery from "./pages/Media/Gallery";
import Videos from "./pages/Media/Videos";

// Contact
import Offices from "./pages/Contact/Offices";

// Admin
import AdminDashboard from "./pages/Admin/Dashboard";
import AddAnnouncement from "./pages/Admin/AddAnnouncement";
import AddEvent from "./pages/Admin/AddEvent";
import AddVacancy from "./pages/Admin/AddVacancy";
import ManageGallery from "./pages/Admin/ManageGallery";
import ManageVideos from "./pages/Admin/ManageVideos";
import Users from "./pages/Admin/Users";
import ManagePayments from "./pages/Admin/ManagePayments";
import ManageTestimonials from "./pages/Admin/ManageTestimonials";
import ManageDocuments from "./pages/Admin/ManageDocuments";
import ManageComments from "./pages/Admin/ManageComments";

function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/get-started" element={<GetStarted />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/login" element={<Login />} />

                {/* About Routes */}
                <Route path="/about/team" element={<Team />} />
                <Route path="/about/mission" element={<Mission />} />
                <Route path="/about/partners" element={<Partners />} />
                <Route path="/all-staff" element={<Staff />} />

                {/* Services Routes */}
                <Route path="/services/savings" element={<Savings />} />
                <Route path="/services/loans" element={<Loans />} />
                <Route path="/services/insurance" element={<Insurance />} />
                <Route path="/services/digital" element={<Digital />} />

                {/* News Routes */}
                <Route path="/news/announcements" element={<Announcements />} />
                <Route path="/news/events" element={<Events />} />
                <Route path="/news/vacancies" element={<Vacancies />} />

                {/* Testimonials Routes */}
                <Route path="/testimonials/documents" element={<Documents />} />
                <Route path="/testimonials/success" element={<Success />} />

                {/* Media Routes */}
                <Route path="/media/gallery" element={<Gallery />} />
                <Route path="/media/videos" element={<Videos />} />

                {/* Contact Routes */}
                <Route path="/contact/offices" element={<Offices />} />
                <Route path="/loan-calculator" element={<LoanCalculator />} />

                {/* Admin Routes - Protected */}
                <Route
                  path="/admin/dashboard"
                  element={
                    //  <ProtectedRoute role="admin">
                    <AdminDashboard />
                    //  </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/add-announcement"
                  element={
                    //  <ProtectedRoute role="admin">
                    <AddAnnouncement />
                    //  </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/add-event"
                  element={
                    //   <ProtectedRoute role="admin">
                    <AddEvent />
                    //   </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/add-vacancy"
                  element={
                    // <ProtectedRoute role="admin">
                    <AddVacancy />
                    //  </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/manage-gallery"
                  element={
                    //   <ProtectedRoute role="admin">
                    <ManageGallery />
                    //  </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/manage-videos"
                  element={
                    //   <ProtectedRoute role="admin">
                    <ManageVideos />
                    //  </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    //  <ProtectedRoute role="admin">
                    <Users />
                    // </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/payments"
                  element={
                    //  <ProtectedRoute role="admin">
                    <ManagePayments />
                    // </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/manage-testimonials"
                  element={
                    //  <ProtectedRoute role="admin">
                    <ManageTestimonials />
                    // </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/manage-documents"
                  element={
                    //  <ProtectedRoute role="admin">
                    <ManageDocuments />
                    // </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/comments"
                  element={
                    //  <ProtectedRoute role="admin">
                    <ManageComments />
                    // </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </RoleProvider>
    </AuthProvider>
  );
}

export default App;
