import { useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "@/constants/menu";
import styles from "./Sidebar.module.scss";
import { useTranslation } from "react-i18next";
import { IoFlashOutline } from "react-icons/io5";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const items = menuItems(t);

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.headerIcon}>
          <IoFlashOutline />
        </div>
        <div className={styles.headerText}>
          <div className={styles.headerApex}>Apex</div>
          <div className={styles.headerDash}>DASHBOARD</div>
        </div>
      </div>

      <ul className={styles.menu}>
        {items.map((item) => (
          <li
            key={item.path}
            className={location.pathname === item.path ? styles.active : ""}
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
