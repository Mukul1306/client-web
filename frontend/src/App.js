import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// PUBLIC PAGES
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import ProductDetails from "./pages/ProductDetails";
import Blogs from "./pages/Blogs";
import ProductInquiry from "./pages/ProductInquiry";
import Contact from "./pages/Contact";
import AboutLayout from "./pages/about/AboutLayout";
import CompanyOverview from "./pages/about/CompanyOverview";
import MissionVision from "./pages/about/MissionVision";
import BusinessValues from "./pages/about/BusinessValues";
import Management from "./pages/about/Management";
import GlobalPresence from "./pages/GlobalPresence";
import ProductsPage from './pages/ProductsPage';
import Licenses from "./pages/Licenses";



// ADMIN AUTH
import AdminLogin from "./admin/AdminLogin";
import ProtectedRoute from "./admin/ProtectedRoute";

// ADMIN
import AdminLayout from "./admin/AdminLayout";
import ProductList from "./admin/ProductList";
import AddProduct from "./admin/AddProduct";
import GalleryAdmin from "./admin/GalleryAdmin";
import BlogAdmin from "./admin/BlogAdmin";
import InquiryAdmin from "./admin/InquiryAdmin";
import CatalogAdmin from "./admin/CatalogAdmin";

function App() {
  return (
    <Routes>

      {/* PUBLIC SITE */}
      <Route path="/" element={<Layout />}>
       
<Route path="/licenses" element={<Licenses />} />
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="product-inquiry" element={<ProductInquiry />} />
        <Route path="contact" element={<Contact />} />
        <Route path="global-presence" element={<GlobalPresence />} />
         <Route path="about" element={<AboutLayout />}>
  <Route index element={<CompanyOverview />} />
  <Route path="company-overview" element={<CompanyOverview />} />
  <Route path="mission-vision" element={<MissionVision />} />
  <Route path="business-values" element={<BusinessValues />} />
  <Route path="management" element={<Management />} />

      </Route>
       <Route path="/all-products" element={<ProductsPage />} />
      {/* ABOUT US SECTION */}
   
</Route>


      {/* ADMIN LOGIN */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* ADMIN PANEL (PROTECTED) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProductList />} />
        <Route path="add" element={<AddProduct />} />
        <Route path="gallery" element={<GalleryAdmin />} />
        <Route path="blogs" element={<BlogAdmin />} />
        <Route path="inquiries" element={<InquiryAdmin />} />
        <Route path="catalogs" element={<CatalogAdmin/>} />
      </Route>

    </Routes>
  );
}

export default App;
