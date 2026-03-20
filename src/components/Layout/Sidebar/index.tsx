import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IoFlashOutline,
  IoChevronDown,
  IoChevronForward,
  IoChevronBack,
  IoChevronForwardOutline,
} from "react-icons/io5";
import styles from "./Sidebar.module.scss";

import { menuItems, MenuItem, SubMenuItem } from "../../../constants/menu";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar = ({ isCollapsed = false, onToggle }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLUListElement>(null);
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (menuName: string) => {
    if (isCollapsed) return;
    
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

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <div className={styles.logo}>
        <div className={styles.headerIcon}>
          <IoFlashOutline />
        </div>
        {!isCollapsed && (
          <div className={styles.headerText}>
            <div className={styles.headerApex}>Apex</div>
            <div className={styles.headerDash}>DASHBOARD</div>
          </div>
        )}
      </div>

      <button className={styles.toggleBtn} onClick={onToggle}>
        {isCollapsed ? <IoChevronForwardOutline /> : <IoChevronBack />}
      </button>

      <ul className={styles.menu} ref={menuRef}>
        {menuItems.map((item: MenuItem) => {
          const Icon = item.icon;
          return (
            <li key={item.name}>
              <div
                className={styles.menuItem}
                onClick={() => toggleMenu(item.name)}
                title={isCollapsed ? item.name : ""}
              >
                <span className={styles.leftIcon}>
                  <Icon />
                </span>
                {!isCollapsed && (
                  <>
                    {item.name}
                    <span className={styles.chevron}>
                      {openMenus.includes(item.name) ? (
                        <IoChevronDown />
                      ) : (
                        <IoChevronForward />
                      )}
                    </span>
                  </>
                )}
              </div>

              {!isCollapsed && openMenus.includes(item.name) && (
                <ul className={styles.subMenu}>
                  {item.children.map((child: SubMenuItem) => {
                    const ChildIcon = child.icon;
                    return (
                      <li
                        key={child.name}
                        onClick={() => {
                          navigate(child.path);
                        }}
                        className={
                          location.pathname === child.path ? styles.active : ""
                        }
                        title={child.name}
                      >
                        <span className={styles.subIcon}>
                          <ChildIcon />
                        </span>
                        {child.name}
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
  );
};

export default Sidebar;