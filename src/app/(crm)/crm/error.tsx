"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function CrmError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("CRM Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <Card className="w-full max-w-lg border-0 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            CRM System Error
          </CardTitle>
          <CardDescription>
            An error occurred in the Content Management System
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error.message || "Something went wrong while loading the CRM dashboard."}
              {error.digest && (
                <div className="mt-2 text-xs text-muted-foreground">
                  Error ID: {error.digest}
                </div>
              )}
            </AlertDescription>
          </Alert>

          <div className="text-sm text-muted-foreground space-y-2">
            <p>This error has been logged and will be investigated.</p>
            <p>You can try:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Refreshing the page</li>
              <li>Returning to the CRM dashboard</li>
              <li>Checking your internet connection</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button onClick={reset} variant="default" className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Link href="/crm" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Go to CRM Home
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="ghost" className="w-full">
              Main Dashboard
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
