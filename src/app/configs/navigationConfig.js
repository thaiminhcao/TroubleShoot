import i18next from "i18next";
import DocumentationNavigation from "../main/documentation/DocumentationNavigation";

import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";
import authRoles from "../auth/authRoles";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

const navigationConfig = [
  {
    id: "dashboards",
    title: "Dashboards",
    // subtitle: "Unique dashboard designs",
    type: "group",
    icon: "heroicons-outline:home",
    translate: "DASHBOARDS",
    children: [
      {
        id: "dashboards.project",
        title: "Project",
        type: "item",
        icon: "heroicons-outline:clipboard-check",
        url: "/dashboards/project",
      },
      {
        id: "dashboards.analytics",
        title: "Analytics",
        type: "item",
        icon: "heroicons-outline:chart-pie",
        url: "/dashboards/analytics",
      },
      {
        id: "dashboards.finance",
        title: "Finance",
        type: "item",
        icon: "heroicons-outline:cash",
        url: "/dashboards/finance",
      },
      {
        id: "dashboards.crypto",
        title: "Crypto",
        type: "item",
        icon: "heroicons-outline:currency-dollar",
        url: "/dashboards/crypto",
      },
      {
        id: "apps.chat",
        title: "Chat",
        type: "item",
        icon: "heroicons-outline:chat-alt",
        url: "/apps/chat",
        translate: "CHAT",
      },
      {
        id: "apps.notes",
        title: "Notes",
        type: "item",
        icon: "heroicons-outline:pencil-alt",
        url: "/apps/notes",
        translate: "NOTES",
      },
    ],
  },
];

export default navigationConfig;
