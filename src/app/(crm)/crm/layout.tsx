"use client";

import React, { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAxios from "@/hooks/use-axios";
import { useAuth } from "@/hooks/use-auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";

export default function CrmLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const axiosInstance = useAxios();
  const { setUserData, loading, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const breadcrumbItems = useMemo(() => {
    const pathSegments = pathname.split("/").filter((segment) => segment);

    const labelMap: Record<string, string> = {
      crm: "Content Management",
      home: "Home",
      about: "About",
      "contact-us": "Contact Us",
      "donate-now": "Donate Now",
      team: "Team",
      gallery: "Gallery",
      press: "Press",
    };

    return pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const label =
        labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      const isLast = index === pathSegments.length - 1;

      return {
        href,
        label,
        isLast,
      };
    });
  }, [pathname]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get("/dashboard/");
        
        if (response.data && response.data.user_info) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Dashboard API Error:", error);
        const storedData = localStorage.getItem('user_data');
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            if (parsedData.user_info) {
              setUserData(parsedData);
            }
          } catch (parseError) {
            console.error("Error parsing stored data:", parseError);
          }
        }
      }
    };

    fetchDashboardData();
  }, [axiosInstance, setUserData]);

  useEffect(() => {
    if (!loading && !isAdmin()) {
      router.push("/dashboard");
    }
  }, [loading, isAdmin, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin()) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Access Denied</strong>
            <p className="mt-2">You do not have permission to access the Content Management System. This area is restricted to administrators only.</p>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                  <React.Fragment key={item.href}>
                    {index > 0 && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                    <BreadcrumbItem
                      className={index === 0 ? "hidden md:block" : ""}
                    >
                      {item.isLast ? (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={item.href}>
                          {item.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-3">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
