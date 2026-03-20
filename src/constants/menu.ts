import {
  IoFlashOutline,
  IoHomeOutline,
  IoCartOutline,
  IoAppsOutline,
  IoWalletOutline,
  IoSettingsOutline,
  IoBarChartOutline,
  IoPeopleOutline,
  IoMailOutline,
  IoCalendarOutline,
  IoDocumentTextOutline,
  IoNotificationsOutline,
  IoHelpBuoyOutline,
} from "react-icons/io5";
import { IconType } from "react-icons";

export interface SubMenuItem {
  name: string;
  nameKey: string;
  icon: IconType;
  path: string;
}

export interface MenuItem {
  name: string;
  nameKey: string;
  icon: IconType;
  children: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    name: "Overview",
    nameKey: "menu.overview",
    icon: IoHomeOutline,
    children: [
      { name: "Dashboard", nameKey: "menu.dashboard", icon: IoBarChartOutline, path: "/dashboard" },
      { name: "Analytics", nameKey: "menu.analytics", icon: IoBarChartOutline, path: "/analytics" },
      { name: "eCommerce", nameKey: "menu.ecommerce", icon: IoCartOutline, path: "/ecommerce" },
      { name: "CRM", nameKey: "menu.crm", icon: IoPeopleOutline, path: "/crm" },
      { name: "SaaS", nameKey: "menu.saas", icon: IoFlashOutline, path: "/saas" },
      { name: "Charts", nameKey: "menu.charts", icon: IoBarChartOutline, path: "/charts" },
    ],
  },
  {
    name: "Commerce",
    nameKey: "menu.commerce",
    icon: IoCartOutline,
    children: [
      { name: "Orders", nameKey: "menu.orders", icon: IoDocumentTextOutline, path: "/orders" },
      { name: "Products", nameKey: "menu.products", icon: IoFlashOutline, path: "/products" },
      { name: "Customers", nameKey: "menu.customers", icon: IoPeopleOutline, path: "/customers" },
    ],
  },
  {
    name: "Apps",
    nameKey: "menu.apps",
    icon: IoAppsOutline,
    children: [
      { name: "Chat", nameKey: "menu.chat", icon: IoMailOutline, path: "/chat" },
      { name: "Calendar", nameKey: "menu.calendar", icon: IoCalendarOutline, path: "/calendar" },
      { name: "Mail", nameKey: "menu.mail", icon: IoMailOutline, path: "/mail" },
    ],
  },
  {
    name: "Finance",
    nameKey: "menu.finance",
    icon: IoWalletOutline,
    children: [
      { name: "Billing", nameKey: "menu.billing", icon: IoDocumentTextOutline, path: "/billing" },
      { name: "Invoices", nameKey: "menu.invoices", icon: IoDocumentTextOutline, path: "/invoices" },
      { name: "Reports", nameKey: "menu.reports", icon: IoBarChartOutline, path: "/reports" },
    ],
  },
  {
    name: "System",
    nameKey: "menu.system",
    icon: IoSettingsOutline,
    children: [
      { name: "Users", nameKey: "menu.users", icon: IoPeopleOutline, path: "/users" },
      { name: "Notifications", nameKey: "menu.notifications", icon: IoNotificationsOutline, path: "/notifications" },
      { name: "Settings", nameKey: "menu.settings", icon: IoSettingsOutline, path: "/settings" },
      { name: "Help & Support", nameKey: "menu.help", icon: IoHelpBuoyOutline, path: "/help" },
    ],
  },
];