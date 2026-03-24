import { routes } from "@/constants/routes";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Users from "@/pages/users";

export const publicRoutes = [
  {
    path: routes.LOGIN,
    element: Login,
  },
];

export const privateRoutes = [
  {
    path: routes.HOME,
    element: Home,
  },

    {
    path: routes.USERS,
    element: Users,
  },
  
];
