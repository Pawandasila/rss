"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  Shield,
  Check,
  X,
} from "lucide-react";
import { toast } from "sonner";
import useAxios from "@/hooks/use-axios";
import Link from "next/link";

const calculatePasswordStrength = (password: string) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  if (!password) return { score: 0, label: "", color: "", checks };
  
  let score = 0;

  if (checks.length) score += 20;
  if (checks.uppercase) score += 20;
  if (checks.lowercase) score += 20;
  if (checks.number) score += 20;
  if (checks.special) score += 20;

  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;

  let label = "";
  let color = "";
  
  if (score <= 40) {
    label = "Weak";
    color = "bg-red-500";
  } else if (score <= 60) {
    label = "Fair";
    color = "bg-orange-500";
  } else if (score <= 80) {
    label = "Good";
    color = "bg-yellow-500";
  } else if (score <= 100) {
    label = "Strong";
    color = "bg-green-500";
  } else {
    label = "Very Strong";
    color = "bg-green-600";
  }

  return { score: Math.min(score, 120), label, color, checks };
};

const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, "Current password is required"),
    new_password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "",
    color: "",
    checks: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
    },
  });
  const axios = useAxios();

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    setIsLoading(true);
    try {
      await axios.post("/account/change-password/", {
        old_password: data.old_password,
        new_password: data.new_password,
      });

      setPasswordChanged(true);
      toast.success("Password changed successfully!");
      form.reset();

      setTimeout(() => {
        window.location.href = "/dashboard/setting";
      }, 2000);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to change password";
      toast.error(errorMessage);
      console.error("Change password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (passwordChanged) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-3 py-6 sm:py-8">
        <div className="w-full max-w-2xl">
          <Card className="border-2 border-green-200 dark:border-green-800">
            <CardHeader className="text-center pb-3 sm:pb-4 p-4 sm:p-6">
              <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-500" />
              </div>
              <CardTitle className="text-lg sm:text-xl lg:text-2xl">
                Password Changed Successfully!
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm lg:text-base mt-1.5 sm:mt-2">
                Your password has been updated. Redirecting you to settings...
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6">
              <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  You can now use your new password to log in to your account.
                </p>
              </div>
              <Button
                variant="default"
                onClick={() => (window.location.href = "/dashboard/setting")}
                className="w-full sm:w-auto h-10 text-sm"
              >
                Go to Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-3 py-6 sm:py-8">
      <div className="w-full max-w-2xl">
        <Link
          href="/dashboard/setting"
          className="inline-flex items-center text-xs sm:text-sm text-muted-foreground hover:text-primary mb-4 sm:mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
          Back to Settings
        </Link>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl">
                  Change Password
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm lg:text-base mt-0.5 sm:mt-1">
                  Update your password to keep your account secure
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-5"
              >
                {/* Current Password */}
                <FormField
                  control={form.control}
                  name="old_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">
                        Current Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                          <Input
                            placeholder="Enter your current password"
                            type={showOldPassword ? "text" : "password"}
                            className="pl-9 sm:pl-10 pr-9 sm:pr-10 h-10 sm:h-11 text-sm"
                            disabled={isLoading}
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            className="absolute right-2.5 sm:right-3 top-2.5 sm:top-3 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showOldPassword ? (
                              <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            ) : (
                              <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="border-t pt-3 sm:pt-4">
                  <p className="text-xs sm:text-sm font-medium text-foreground mb-3 sm:mb-4">
                    New Password
                  </p>

                  {/* New Password */}
                  <FormField
                    control={form.control}
                    name="new_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-sm">
                          New Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                            <Input
                              placeholder="Enter your new password"
                              type={showNewPassword ? "text" : "password"}
                              className="pl-9 sm:pl-10 pr-9 sm:pr-10 h-10 sm:h-11 text-sm"
                              disabled={isLoading}
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                const strength = calculatePasswordStrength(e.target.value);
                                setPasswordStrength(strength);
                              }}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                              className="absolute right-2.5 sm:right-3 top-2.5 sm:top-3 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showNewPassword ? (
                                <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              ) : (
                                <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>

                        {/* Password Strength Indicator */}
                        {field.value && (
                          <div className="mt-2 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                Password strength:
                              </span>
                              <span className={`text-xs font-semibold ${
                                passwordStrength.label === "Weak" ? "text-red-600" :
                                passwordStrength.label === "Fair" ? "text-orange-600" :
                                passwordStrength.label === "Good" ? "text-yellow-600" :
                                "text-green-600"
                              }`}>
                                {passwordStrength.label}
                              </span>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                                style={{ width: `${Math.min((passwordStrength.score / 120) * 100, 100)}%` }}
                              />
                            </div>
                            
                            {/* Password Requirements Checklist */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2 text-xs">
                              <div className={`flex items-center gap-1.5 ${
                                passwordStrength.checks.length ? "text-green-600" : "text-muted-foreground"
                              }`}>
                                {passwordStrength.checks.length ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <X className="w-3 h-3" />
                                )}
                                <span>At least 8 characters</span>
                              </div>
                              <div className={`flex items-center gap-1.5 ${
                                passwordStrength.checks.uppercase ? "text-green-600" : "text-muted-foreground"
                              }`}>
                                {passwordStrength.checks.uppercase ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <X className="w-3 h-3" />
                                )}
                                <span>Uppercase letter</span>
                              </div>
                              <div className={`flex items-center gap-1.5 ${
                                passwordStrength.checks.lowercase ? "text-green-600" : "text-muted-foreground"
                              }`}>
                                {passwordStrength.checks.lowercase ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <X className="w-3 h-3" />
                                )}
                                <span>Lowercase letter</span>
                              </div>
                              <div className={`flex items-center gap-1.5 ${
                                passwordStrength.checks.number ? "text-green-600" : "text-muted-foreground"
                              }`}>
                                {passwordStrength.checks.number ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <X className="w-3 h-3" />
                                )}
                                <span>Number</span>
                              </div>
                            </div>
                          </div>
                        )}

                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password */}
                  <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                      <FormItem className="mt-3 sm:mt-4">
                        <FormLabel className="text-xs sm:text-sm">
                          Confirm New Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                            <Input
                              placeholder="Re-enter your new password"
                              type={showConfirmPassword ? "text" : "password"}
                              className="pl-9 sm:pl-10 pr-9 sm:pr-10 h-10 sm:h-11 text-sm"
                              disabled={isLoading}
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-2.5 sm:right-3 top-2.5 sm:top-3 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              ) : (
                                <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <Alert className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
                  <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
                    <strong>Security Tips:</strong> Use a strong, unique
                    password that you don&apos;t use anywhere else.
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-1 sm:pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      (window.location.href = "/dashboard/setting")
                    }
                    disabled={isLoading}
                    className="flex-1 h-10 text-sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-10 text-sm"
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                    )}
                    Change Password
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
