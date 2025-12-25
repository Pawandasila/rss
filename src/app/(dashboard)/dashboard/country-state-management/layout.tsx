import { RoleGuard } from "@/components/auth/RoleGuard";

export default function CountryStateManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["admin", "staff"]} showUnauthorized={true}>
      {children}
    </RoleGuard>
  );
}
