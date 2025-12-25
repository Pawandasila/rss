import type { User } from "@/types/auth.types";

export type DashboardRole =
  | "guest"
  | "admin"
  | "staff"
  | "volunteer"
  | "member"
  | "field_worker"
  | "audience";

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
