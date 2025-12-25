import type { LucideIcon } from "lucide-react";
import {
  Home,
  Image as ImageIcon,
  FileText,
  Briefcase,
  Users,
  Target,
} from "lucide-react";

import type { User } from "@/types/auth.types";

export type DashboardRole =
  | "guest"
  | "admin"
  | "staff"
  | "volunteer"
  | "member"
  | "field_worker"
  | "audience";

export interface NavItemConfig {
  title: string;
  url: string;
  icon: LucideIcon;
  description?: string;
  badge?: string;
  roles?: DashboardRole[] | "all";
}

interface RoleDefinition {
  role: DashboardRole;
  flags?: Array<keyof User>;
  predicate?: (user: User) => boolean;
}

export const DASHBOARD_ROLE_DEFINITIONS: RoleDefinition[] = [
  {
    role: "admin",
    flags: ["is_admin_account", "is_superuser"],
  },
  {
    role: "staff",
    flags: ["is_staff_account", "is_staff"],
  },
  {
    role: "volunteer",
    flags: ["is_volunteer"],
  },
  {
    role: "member",
    flags: ["is_member_account"],
  },
  {
    role: "field_worker",
    flags: ["is_field_worker"],
  },
];

export const DASHBOARD_NAV_ITEMS: NavItemConfig[] = [
  {
    title: "Home",
    url: "/crm/home",
    icon: Home,
    description: "Manage home page content",
    roles: ["admin"],
  },
  // {
  //   title: "About",
  //   url: "/crm/about",
  //   icon: FileText,
  //   description: "Update about us content",
  //   roles: ["admin"],
  // },
  //   {
  //     title: "Contact Us",
  //     url: "/crm/contact-us",
  //     icon: Mail,
  //     description: "Update contact information",
  //     roles: ["admin"],
  //   },
  //   {
  //     title: "Donate Now",
  //     url: "/crm/donate-now",
  //     icon: ImageIcon,
  //     description: "Manage donation page",
  //     roles: ["admin"],
  //   },
  {
    title: "Team",
    url: "/crm/team",
    icon: Users,
    description: "Manage team members",
    roles: ["admin"],
  },
  {
    title: "Gallery",
    url: "/crm/gallery",
    icon: ImageIcon,
    description: "Manage image gallery",
    roles: ["admin"],
  },
  {
    title: "Press",
    url: "/crm/press",
    icon: FileText,
    description: "Manage press releases",
    roles: ["admin"],
  },
  {
    title: "Blog",
    url: "/crm/blog",
    icon: FileText,
    description: "Manage blog posts",
    roles: ["admin"],
  },
  {
    title: "Services",
    url: "/crm/services",
    icon: Briefcase,
    description: "Manage services",
    roles: ["admin"],
  },
  {
    title: "Mission",
    url: "/crm/mission",
    icon: Target,
    description: "Manage mission page",
    roles: ["admin"],
  },
];

export const deriveDashboardRoles = (user: User | null): DashboardRole[] => {
  const roles: Set<DashboardRole> = new Set(["audience"]);

  if (!user) {
    return Array.from(roles);
  }

  DASHBOARD_ROLE_DEFINITIONS.forEach(({ role, flags, predicate }) => {
    if (roles.has(role)) return;

    const matchesFlag = flags?.some((flag) => Boolean(user[flag]));
    const matchesPredicate = predicate ? predicate(user) : false;

    if (matchesFlag || matchesPredicate) {
      roles.add(role);
    }
  });

  if (
    !roles.has("admin") &&
    !roles.has("staff") &&
    !roles.has("volunteer") &&
    !roles.has("member") &&
    !roles.has("field_worker")
  ) {
    roles.add("audience");
  }

  return Array.from(roles);
};

export const filterNavItemsForRoles = (
  items: NavItemConfig[],
  roles: DashboardRole[]
): NavItemConfig[] => {
  const roleSet = new Set(roles);

  return items.filter((item) => {
    if (!item.roles || item.roles === "all") {
      return true;
    }

    return item.roles.some((role) => roleSet.has(role));
  });
};
