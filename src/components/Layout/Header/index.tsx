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
  IoChevronDown,
} from "react-icons/io5";
import { useTheme } from "../../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { uzFlag, ruFlag } from "../../../assets/icons";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const logout = () => {
    dispatch.auth.logoutAsync();
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setShowLanguageDropdown(false);
  };

  const userName = "AS";
  const userInitial = userName.substring(0, 2);

  const currentLanguage = i18n.language === "uz" ? "UZ" : "RU";

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
            placeholder={t("searchPlaceholder")}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <button className={styles.newOrderBtn}>
          <IoAddOutline />
          {t("newOrder")}
        </button>

        <div className={styles.languageSelector}>
          <div
            className={styles.selectedLanguage}
            onClick={toggleLanguageDropdown}
          >
            <span className={styles.flagIcon}>
              {i18n.language === "uz" ? (
                <img src={uzFlag} alt="UZ" />
              ) : (
                <img src={ruFlag} alt="RU" />
              )}
            </span>
            <span className={styles.languageText}>{currentLanguage}</span>
            <IoChevronDown
              className={`${styles.arrow} ${showLanguageDropdown ? styles.rotated : ""}`}
            />
          </div>

          <div
            className={`${styles.languageDropdown} ${showLanguageDropdown ? styles.show : ""}`}
          >
            <button onClick={() => changeLanguage("uz")}>
              <span className={styles.flagIcon}>
                <img src={uzFlag} alt="UZ" />
              </span>
              O'zbekcha
            </button>
            <button onClick={() => changeLanguage("ru")}>
              <span className={styles.flagIcon}>
                <img src={ruFlag} alt="RU" />
              </span>
              Русский
            </button>
          </div>
        </div>

        <div className={styles.themeToggle} onClick={toggleTheme}>
          {theme === "dark" ? <IoMoonOutline /> : <IoSunnyOutline />}
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
            <Link to={routes.PROFILE}>{t("profile")}</Link>
            <button onClick={logout}>{t("logout")}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
