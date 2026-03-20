import { FC, ReactNode, useState } from "react";
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

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={styles.layout}>
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      <div className={styles.main}>
        <Header />
        <div className={styles.content}>
          <Breadcrumb />
          <div className={styles.page}>{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
