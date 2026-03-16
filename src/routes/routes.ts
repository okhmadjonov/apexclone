import { routes } from "@/constants/routes";
import Home from "@/pages/home";
import Login from "@/pages/login";

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
  
];
