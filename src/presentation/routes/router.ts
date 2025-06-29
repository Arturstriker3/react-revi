import { RouteObject } from "react-router-dom";
import React from "react";
import LandingPage from "../pages/LandingPage";
import Monsters from "../pages/Monsters";
import Battles from "../pages/Battles";
import DashboardLayout from "../layout/DashboardLayout";

// Extende RouteObject e permite propriedades extras
export type AppRoute = RouteObject & {
  title?: string;
  requiresAuth?: boolean;
};

export const routes: AppRoute[] = [
  {
    path: "/",
    element: React.createElement(LandingPage),
    title: "Monster Arena",
  },
  {
    path: "/dashboard",
    element: React.createElement(DashboardLayout),
    title: "Dashboard",
    requiresAuth: true,
    children: [
      {
        path: "",
        element: React.createElement(Monsters),
        title: "Monstros",
      },
      {
        path: "monsters",
        element: React.createElement(Monsters),
        title: "Monstros",
      },
      {
        path: "battles",
        element: React.createElement(Battles),
        title: "Batalhas",
      },
    ] as AppRoute[],
  },
];

export const getRouteByPath = (path: string): AppRoute | undefined => {
  return routes.find((route) => route.path === path);
};

export const getNestedRouteByPath = (path: string): AppRoute | undefined => {
  for (const route of routes) {
    if (route.children) {
      const childRoute = (route.children as AppRoute[]).find(
        (child) =>
          `${route.path}${child.path}` === path ||
          (route.path === "/" && child.path === path)
      );
      if (childRoute) return childRoute;
    }
  }
  return undefined;
};
