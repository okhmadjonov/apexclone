
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
  icon: IconType;
  path: string;
}

export interface MenuItem {
  name: string;
  icon: IconType;
  children: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    name: "Overview",
    icon: IoHomeOutline,
    children: [
      { name: "Dashboard", icon: IoBarChartOutline, path: "/dashboard" },
      { name: "Analytics", icon: IoBarChartOutline, path: "/analytics" },
      { name: "eCommerce", icon: IoCartOutline, path: "/ecommerce" },
      { name: "CRM", icon: IoPeopleOutline, path: "/crm" },
      { name: "SaaS", icon: IoFlashOutline, path: "/saas" },
      { name: "Charts", icon: IoBarChartOutline, path: "/charts" },
    ],
  },
  {
    name: "Commerce",
    icon: IoCartOutline,
    children: [
      { name: "Orders", icon: IoDocumentTextOutline, path: "/orders" },
      { name: "Products", icon: IoFlashOutline, path: "/products" },
      { name: "Customers", icon: IoPeopleOutline, path: "/customers" },
    ],
  },
  {
    name: "Apps",
    icon: IoAppsOutline,
    children: [
      { name: "Chat", icon: IoMailOutline, path: "/chat" },
      { name: "Calendar", icon: IoCalendarOutline, path: "/calendar" },
      { name: "Mail", icon: IoMailOutline, path: "/mail" },
    ],
  },
  {
    name: "Finance",
    icon: IoWalletOutline,
    children: [
      { name: "Billing", icon: IoDocumentTextOutline, path: "/billing" },
      { name: "Invoices", icon: IoDocumentTextOutline, path: "/invoices" },
      { name: "Reports", icon: IoBarChartOutline, path: "/reports" },
    ],
  },
  {
    name: "System",
    icon: IoSettingsOutline,
    children: [
      { name: "Users", icon: IoPeopleOutline, path: "/users" },
      { name: "Notifications", icon: IoNotificationsOutline, path: "/notifications" },
      { name: "Settings", icon: IoSettingsOutline, path: "/settings" },
      { name: "Help & Support", icon: IoHelpBuoyOutline, path: "/help" },
    ],
  },
];