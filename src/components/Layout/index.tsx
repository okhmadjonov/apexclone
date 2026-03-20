import { FC, ReactNode, useState, useEffect } from "react";
import styles from "./Layout.module.scss";
import Sidebar from "./Sidebar/";
import Header from "./Header/";
import Footer from "./Footer/";
import Breadcrumb from "../Breadcrumb/";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={styles.layout}>
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        isMobile={isMobile}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={closeMobileMenu}
      />
      <div className={styles.main}>
        <Header
          onMenuClick={toggleSidebar}
          isMobile={isMobile}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <div className={styles.content}>
          <Breadcrumb />
          <div className={styles.page}>{children}</div>
        </div>
        <Footer />
      </div>
      {isMobile && isMobileMenuOpen && (
        <div className={styles.overlay} onClick={closeMobileMenu}></div>
      )}
    </div>
  );
};

export default Layout;
