import { FC, ReactNode } from "react";
import styles from "./Layout.module.scss";
import Sidebar from "./Sidebar/";
import Header from "./Header/";
import Footer from "./Footer/";
import Breadcrumb from "../Breadcrumb/";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
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
