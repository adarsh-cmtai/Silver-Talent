// src/components/layout/Layout.jsx
import Navbar from './Navbar'; // Assuming Navbar.jsx is in the same directory
import Footer from './Footer'; // Assuming Footer.jsx is in the same directory
import { Outlet } from 'react-router-dom';

const Layout = () => {
  // Approximate total height of the fixed navbar.
  // Top Bar (~40px) + Main Nav Section (unscrolled: ~88px) = ~128px
  // Adjust this value based on your actual navbar height after rendering.
  // You can use Tailwind's spacing scale: 128px is pt-32 (128/4=32)
  const mainContentPaddingTop = "pt-[128px]"; // Or "pt-32"
  // If your Footer also has a fixed height and you want to prevent content from going under it,
  // you might add a pb-[footerHeight] to the main tag as well. For now, assuming footer is not fixed.

  return (
    <div className="flex flex-col min-h-screen "> {/* Ensure the layout itself takes full screen height */}
      <Navbar />
      <main className={`flex-grow ${mainContentPaddingTop}`}> {/* Apply padding and allow content to grow */}
        <Outlet /> {/* This is where your Index.jsx (and other pages) content will be rendered */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;