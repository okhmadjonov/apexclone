import { useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { routes } from "@/constants/routes";
import { dispatch } from "@/redux";
import {
  IoSearchOutline,
  IoAddOutline,
  IoSunnyOutline,
  IoMoonOutline,
  IoNotificationsOutline,
} from "react-icons/io5";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const logout = () => {
    dispatch.auth.logoutAsync();
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const userName = "Admin";
  const userInitial = userName.charAt(0);

  return (
    <div className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>
            <IoSearchOutline />
          </span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search anything..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <button className={styles.newOrderBtn}>
          <IoAddOutline />
          New order
        </button>

        <div className={styles.themeToggle} onClick={toggleTheme}>
          {isDarkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
        </div>

        <div className={styles.notificationWrapper}>
          <span className={styles.notificationIcon}>
            <IoNotificationsOutline />
          </span>
          <span className={styles.notificationDot}></span>
        </div>

        <div className={styles.userWrapper} onClick={toggleDropdown}>
          <div className={styles.userAvatar}>{userInitial}</div>

          <div
            className={`${styles.userDropdown} ${showDropdown ? styles.show : ""}`}
          >
            <Link to={routes.PROFILE}>Profile</Link>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
