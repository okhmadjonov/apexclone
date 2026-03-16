import { UserOutlined, ProductOutlined } from "@ant-design/icons";
import { routes } from "./routes";
import { route } from "@/utils";

interface Item {
  name: string;
  icon: any;
  path: string;
}

interface MenuItem extends Item {
  sub?: Item[];
}

export const menuItems = (t: any): MenuItem[] => [
  { name: "USERS", icon: UserOutlined, path: "/users" },
  
  {
    name: "NEWS",
    path: route(routes.MINI_APP_VIEW, {
      id: "1",
    }),
    icon: ProductOutlined,
  },
];
