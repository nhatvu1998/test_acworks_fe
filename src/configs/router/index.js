export const UnauthenticatedRoutes = [
  {
    exact: true,
    path: "/login",
    component: "login",
  },
];

export const AuthenticatedRoutes = [
  {
    exact: true,
    path: "/home",
    component: "home",
  },
  {
    exact: true,
    path: "/detail",
    component: "detail",
  },
  {
    exact: true,
    path: "/users",
    component: "user",
  },
  {
    exact: true,
    path: "/criterias",
    component: "criteria",
  },
  {
    exact: true,
    path: "/userCriteria",
    component: "userCriteria",
  }
];
