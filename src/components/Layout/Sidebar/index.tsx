import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  IoFlashOutline,
  IoChevronDown,
  IoChevronForward,
  IoChevronBack,
  IoChevronForwardOutline,
  IoCloseOutline,
} from "react-icons/io5";
import styles from "./Sidebar.module.scss";

import { menuItems, MenuItem, SubMenuItem } from "../../../constants/menu";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  isMobile?: boolean;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const Sidebar = ({
  isCollapsed = false,
  onToggle,
  isMobile = false,
  isMobileOpen = false,
  onMobileClose,
}: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const menuRef = useRef<HTMLUListElement>(null);
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  useEffect(() => {
    if (isMobile && isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobile, isMobileOpen]);

  const toggleMenu = (menuName: string) => {
    if (isCollapsed && !isMobile) return;

    setOpenMenus((prev) => {
      const newOpenMenus = prev.includes(menuName)
        ? prev.filter((name) => name !== menuName)
        : [...prev, menuName];

      setTimeout(() => {
        if (menuRef.current) {
          const activeElement = menuRef.current.querySelector(
            `.${styles.active}`,
          );
          if (activeElement) {
            activeElement.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }
        }
      }, 100);

      return newOpenMenus;
    });
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <>
      <div
        className={`
          ${styles.sidebar} 
          ${isCollapsed && !isMobile ? styles.collapsed : ""} 
          ${isMobile ? styles.mobile : ""} 
          ${isMobileOpen ? styles.mobileOpen : ""}
        `}
      >
        <div className={styles.logo}>
          <div className={styles.headerIcon}>
            <IoFlashOutline />
          </div>
          {(!isCollapsed || isMobile) && (
            <div className={styles.headerText}>
              <div className={styles.headerApex}>Apex</div>
              <div className={styles.headerDash}>DASHBOARD</div>
            </div>
          )}
        </div>

        {!isMobile && (
          <button className={styles.toggleBtn} onClick={onToggle}>
            {isCollapsed ? <IoChevronForwardOutline /> : <IoChevronBack />}
          </button>
        )}

        {isMobile && isMobileOpen && (
          <button className={styles.closeBtn} onClick={onMobileClose}>
            <IoCloseOutline />
          </button>
        )}

        <ul className={styles.menu} ref={menuRef}>
          {menuItems.map((item: MenuItem) => {
            const Icon = item.icon;
            const showText = !isCollapsed || isMobile;
            const translatedName = t(item.nameKey);

            return (
              <li key={item.name}>
                <div
                  className={styles.menuItem}
                  onClick={() => toggleMenu(item.name)}
                  title={!showText && !isMobile ? translatedName : ""}
                >
                  <span className={styles.leftIcon}>
                    <Icon />
                  </span>
                  {showText && (
                    <>
                      {translatedName}
                      {item.children && item.children.length > 0 && (
                        <span className={styles.chevron}>
                          {openMenus.includes(item.name) ? (
                            <IoChevronDown />
                          ) : (
                            <IoChevronForward />
                          )}
                        </span>
                      )}
                    </>
                  )}
                </div>

                {showText && openMenus.includes(item.name) && item.children && (
                  <ul className={styles.subMenu}>
                    {item.children.map((child: SubMenuItem) => {
                      const ChildIcon = child.icon;
                      return (
                        <li
                          key={child.name}
                          onClick={() => handleMenuItemClick(child.path)}
                          className={
                            location.pathname === child.path
                              ? styles.active
                              : ""
                          }
                          title={t(child.nameKey)}
                        >
                          <span className={styles.subIcon}>
                            <ChildIcon />
                          </span>
                          {t(child.nameKey)}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
