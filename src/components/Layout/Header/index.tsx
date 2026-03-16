import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { routes } from "@/constants/routes";
import { dispatch } from "@/redux";

const Header = () => {
  const logout = () => {
    dispatch.auth.logoutAsync();
  };

  return (
    <div className={styles.header}>
        <span className={styles.user}>Admin</span>
        <div className={styles.menu}>
          <Link to={routes.PROFILE}>Profile</Link>
          <button onClick={logout}>Logout</button>
        </div>
    </div>
  );
};

export default Header;