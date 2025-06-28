// src/App.jsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your Layout component
import Layout from "./components/layout/Layout"; // Ensure this path is correct

// Import your page components
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import ServiceDetailPage from "./pages/ServiceDetailPage"; // <-- IMPORT SERVICE DETAIL PAGE
import Vacancies from "./pages/Vacancies";
import Blogs from "./pages/BlogsPage"; // Main blogs page (listing)
import BlogDetail from './components/blogs/BlogDetail'; // Specific blog post detail
// Note: BlogSection might be a component used within Blogs page, or another route.
// If it's a separate page route, ensure it's distinct from "/blogs" or "/blog"
// For now, I'm assuming Blogs.js is the main listing and BlogDetail is for individual posts.
// I'll remove the duplicate BlogSection route if Blogs.js serves as the listing.

import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="overflow-x-hidden" style={{ zoom: '95%' }}>
        <BrowserRouter>
          <Routes>
            {/* Main Layout Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="about" element={<About />} />

              {/* Services Routes */}
              <Route path="services" element={<Services />} />
              <Route path="services/:serviceId" element={<ServiceDetailPage />} /> {/* <-- ADDED SERVICE DETAIL ROUTE */}

              <Route path="vacancies" element={<Vacancies />} />
              <Route path="contact" element={<Contact />} />

              {/* Blog Routes */}
              {/* Assuming Blogs.js is the page that lists all blogs (like a blog section) */}
              <Route path="blog" element={<Blogs />} />
              <Route path="blog/:id" element={<BlogDetail />} />
              <Route path="admin-login" element={<AdminLoginPage />} />
              {/* If BlogSection was intended as a different top-level route, it would be:
                <Route path="blog-section" element={<BlogSection />} />
                But typically, a blog listing page is just /blog.
              */}

              {/* Catch-all for not found pages */}
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Routes - Outside Main Layout */}
            {/* <Route path="admin-login" element={<AdminLoginPage />} /> */}
            <Route path="admin/dashboard" element={<AdminDashboardPage />} />

            {/* Example of routes OUTSIDE the main Layout (e.g., for a completely different admin panel layout) */}
            {/*
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="users" element={<AdminUsersPage />} />
            </Route>
            */}

          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;