"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useUpdateCurrentUser } from "@/module/dashboard/users/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  UserIcon,
  MapPin,
  CreditCard,
  Camera,
  Loader2,
  CheckCircle2,
  XCircle,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EditableField } from "./_components/EditableField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getUserImageUrl } from "@/lib/media";
import {
  StateSelect,
  DistrictSelect,
} from "@/module/country/components/country-select";
import { useCountryApi } from "@/module/country/hooks";

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  dob: string;
  blood_group: string;
  gender: string;
  profession: string;
  aadhar_number: string;
  pan_number: string;
  street: string;
  username: string;
  sub_district: string;
  district: string;
  city: string;
  division: string;
  state: string;
  country: string;
  postal_code: string;
}

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GENDERS = ["Male", "Female", "Other"];
const PROFESSIONS = [
  "Business Owner",
  "Defence Forces (Army / Navy / Air Force / Police)",
  "Doctor",
  "Engineer",
  "Driver",
  "Farmer",
  "Government Employee",
  "Housewife",
  "Retired",
  "Self Employed",
  "Social Worker",
  "Student",
  "Teacher",
  "Unemployed",
  "Other",
];

export default function SettingsPage() {
  const { user, setUserData } = useAuth();
  const { updateCurrentUser, isUpdating } = useUpdateCurrentUser();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const { states, fetchStates } = useCountryApi();
  const [selectedStateId, setSelectedStateId] = useState<number | undefined>(
    undefined
  );
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
    dob: "",
    blood_group: "",
    gender: "",
    profession: "",
    aadhar_number: "",
    pan_number: "",
    username: "",
    street: "",
    sub_district: "",
    district: "",
    city: "",
    division: "",
    state: "",
    country: "India",
    postal_code: "",
  });
  const [otherProfessionDetail, setOtherProfessionDetail] = useState("");

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  useEffect(() => {
    if (formData.state && Array.isArray(states) && states.length > 0) {
      const found = states.find((s) => s.name === formData.state);
      setSelectedStateId(found?.id);
    } else {
      setSelectedStateId(undefined);
    }
  }, [formData.state, states]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        dob: user.dob || "",
        blood_group: user.blood_group || "",
        gender: user.gender || "",
        profession: user.profession || "",
        aadhar_number: user.aadhar_number || "",
        pan_number: user.pan_number || "",
        username: user.username || "",
        street: user.street || "",
        sub_district: user.sub_district || "",
        district: user.district || "",
        city: user.city || "",
        division: user.division || "",
        state: user.state || "",
        country: user.country || "",
        postal_code: user.postal_code || "",
      });
    }
  }, [user]);

  const professionOptions = useMemo(() => {
    if (formData.profession && !PROFESSIONS.includes(formData.profession)) {
      return [...PROFESSIONS, formData.profession];
    }
    return PROFESSIONS;
  }, [formData.profession]);

  useEffect(() => {
    if (
      (editingField !== "profession" || formData.profession !== "Other") &&
      otherProfessionDetail !== ""
    ) {
      setOtherProfessionDetail("");
    }
  }, [editingField, formData.profession, otherProfessionDetail]);

  const handleFieldEdit = (fieldName: string) => {
    if (fieldName === "profession") {
      if (formData.profession === "Other") {
        setOtherProfessionDetail("");
      } else if (
        formData.profession &&
        !PROFESSIONS.includes(formData.profession)
      ) {
        setOtherProfessionDetail(formData.profession);
      } else {
        setOtherProfessionDetail("");
      }
    }
    setEditingField(fieldName);
  };

  const handleFieldSave = async (fieldName: string) => {
    if (!user?.id) {
      toast.error("User ID not found");
      return;
    }

    let fieldValue = String(
      formData[fieldName as keyof UserFormData] ?? ""
    ).trim();

    // Basic validations
    const isAadhaarValid = (v: string) =>
      /^\d{12}$/.test(v) && !/^([0-9])\1{11}$/.test(v);
    const isPanValid = (v: string) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(v);
    const isPostalValid = (v: string) => /^\d{6}$/.test(v);

    if (fieldName === "profession" && fieldValue === "Other") {
      if (!otherProfessionDetail.trim()) {
        toast.error("Please describe your profession before saving");
        return;
      }
      fieldValue = otherProfessionDetail.trim();
    }

    if (fieldName === "aadhar_number") {
      const normalized = fieldValue.replace(/\D/g, "");
      if (!isAadhaarValid(normalized)) {
        toast.error("Invalid Aadhar number", {
          description: "Aadhar must be 12 digits.",
        });
        return;
      }
      fieldValue = normalized;
    }

    if (fieldName === "pan_number") {
      const normalized = fieldValue.toUpperCase();
      if (!isPanValid(normalized)) {
        toast.error("Invalid PAN number", {
          description: "Format: AAAAA9999A",
        });
        return;
      }
      fieldValue = normalized;
    }

    if (fieldName === "postal_code") {
      const normalized = fieldValue.replace(/\D/g, "");
      if (!isPostalValid(normalized)) {
        toast.error("Invalid PIN code", {
          description: "PIN must be 6 digits.",
        });
        return;
      }
      fieldValue = normalized;
    }

    try {
      const result = await updateCurrentUser(user.id, {
        [fieldName]: fieldValue,
      });

      if (result.success && result.data) {
        setUserData(result.data);
        setLastError(null);

        setFormData({
          name: result.data.name || "",
          email: result.data.email || "",
          phone: result.data.phone || "",
          dob: result.data.dob || "",
          blood_group: result.data.blood_group || "",
          gender: result.data.gender || "",
          profession: result.data.profession || "",
          aadhar_number: result.data.aadhar_number || "",
          pan_number: result.data.pan_number || "",
          username: result.data.username || "",
          street: result.data.street || "",
          sub_district: result.data.sub_district || "",
          district: result.data.district || "",
          city: result.data.city || "",
          division: result.data.division || "",
          state: result.data.state || "",
          country: result.data.country || "",
          postal_code: result.data.postal_code || "",
        });

        toast.success(
          `${fieldName
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())} updated successfully!`
        );
        setEditingField(null);
        setOtherProfessionDetail("");
      } else {
        const errorMsg = result.error || `Failed to update ${fieldName}`;
        setLastError(errorMsg);
        toast.error(errorMsg, {
          description: "Error details shown above",
          duration: 5000,
        });
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      setLastError(`Unexpected error: ${errorMsg}`);
      toast.error("An unexpected error occurred", {
        description: errorMsg,
        duration: 5000,
      });
    }
  };

  const handleFieldCancel = (fieldName: string) => {
    // Reset to original value
    if (user) {
      const userValue = user[fieldName as keyof typeof user];
      setFormData((prev) => ({
        ...prev,
        [fieldName]:
          typeof userValue === "string" || typeof userValue === "number"
            ? String(userValue)
            : "",
      }));
    }
    if (fieldName === "profession") {
      setOtherProfessionDetail("");
    }
    setEditingField(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user?.id) return;

    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const result = await updateCurrentUser(user.id, { image: file });

    if (result.success && result.data) {
      setUserData(result.data);
      toast.success("Profile image updated successfully!");
    } else {
      toast.error(result.error || "Failed to upload image");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Get properly formatted image URL
  const userImageUrl = getUserImageUrl(user.image);

  // Check if user has rssindia.org email
  const hasRssIndiaEmail = user?.email?.toLowerCase().includes("@rssindia.org");

  return (
    <div className="container mx-auto px-3 py-4 sm:p-6 lg:p-8 max-w-7xl">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
          Manage your profile information and account settings
        </p>
      </div>

      {lastError && (
        <div className="mb-4 bg-red-50 dark:bg-red-950 border-2 border-red-500 rounded-lg p-3 sm:p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <h3 className="text-sm sm:text-base font-semibold text-red-800 dark:text-red-200">
                  Update Failed
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 break-words">
                {lastError}
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                Time: {new Date().toLocaleTimeString()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLastError(null)}
              className="flex-shrink-0 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {hasRssIndiaEmail && (
        <div className="mb-4 sm:mb-6 bg-red-50 border-2 border-red-500 rounded-lg p-3 sm:p-4 animate-pulse">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-red-900 mb-1.5 sm:mb-2">
                🚨 URGENT: Email Change Required
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-red-800 mb-2 sm:mb-3">
                Your current email address uses the{" "}
                <strong>@rssindia.org</strong> domain, which is no longer
                supported. You must update your email address immediately to
                continue accessing the platform.
              </p>
              <p className="text-xs sm:text-sm text-red-700 mb-2 sm:mb-3">
                Please scroll down to the <strong>Basic Information</strong>{" "}
                section and update your email address to a valid personal or
                organizational email.
              </p>
              <div className="bg-red-100 border border-red-300 rounded p-2 sm:p-3">
                <p className="text-xs sm:text-sm text-red-900 font-medium">
                  ⚠️ Your account access may be restricted until you update your
                  email address.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              Profile Picture
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Update your profile picture
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              <div className="flex flex-col items-center gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative group cursor-pointer transition-all hover:scale-105">
                      <Avatar className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 border-2 sm:border-4 border-primary/20 bg-background">
                        {userImageUrl ? (
                          <AvatarImage
                            src={userImageUrl}
                            alt={user.name}
                            className="object-cover"
                          />
                        ) : (
                          <AvatarFallback className="text-3xl bg-primary/10">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="absolute inset-0 rounded-full bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-xs font-medium text-white bg-black/50 px-2 py-1 rounded-full">
                          View
                        </span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl border-none bg-transparent shadow-none p-0">
                    <DialogTitle className="sr-only">
                      Profile Picture
                    </DialogTitle>
                    <div className="flex items-center justify-center w-full h-full p-4 focus:outline-none">
                      {userImageUrl ? (
                        <img
                          src={userImageUrl}
                          alt={user.name}
                          className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl ring-1 ring-white/10"
                        />
                      ) : (
                        <div className="bg-background p-8 rounded-xl shadow-lg text-center">
                          <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-muted">
                            <AvatarFallback className="text-4xl text-muted-foreground">
                              {user.name?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-muted-foreground font-medium">
                            No profile photo set
                          </p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                <div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUpdating}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2 shadow-sm"
                    onClick={() =>
                      document.getElementById("image-upload")?.click()
                    }
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                    Change Photo
                  </Button>
                </div>
              </div>

              <div className="text-center space-y-1.5 sm:space-y-2">
                <h3 className="font-semibold text-base sm:text-lg">
                  {user.name}
                </h3>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                  {user.is_verified && (
                    <Badge variant="default" className="text-xs">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {user.is_volunteer && (
                    <Badge variant="secondary" className="text-xs">
                      Volunteer
                    </Badge>
                  )}
                  {user.is_admin_account && (
                    <Badge variant="destructive" className="text-xs">
                      Admin
                    </Badge>
                  )}
                </div>
              </div>

              <Separator />

              <div className="w-full space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  {user.is_blocked ? (
                    <Badge variant="destructive" className="text-xs">
                      <XCircle className="w-3 h-3 mr-1" />
                      Blocked
                    </Badge>
                  ) : (
                    <Badge variant="default" className="text-xs">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Joined:</span>
                  <span className="font-medium text-xs sm:text-sm">
                    {new Date(user.date_joined).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              Personal Information
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Update your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5 sm:gap-2">
                  <UserIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <EditableField
                    label="Full Name (पूरा नाम)"
                    name="name"
                    value={formData.name}
                    isEditing={false}
                    isLoading={isUpdating && editingField === "name"}
                    required
                    placeholder="Enter your full name"
                    disabled
                    onEdit={() => {}}
                    onSave={() => {}}
                    onCancel={() => {}}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, name: value }))
                    }
                  />

                  <EditableField
                    label="Email (ईमेल)"
                    name="email"
                    value={formData.email}
                    type="text"
                    isEditing={false}
                    required
                    disabled
                    placeholder="your.email@example.com"
                    onEdit={() => {}}
                    onSave={() => {}}
                    onCancel={() => {}}
                    onChange={() => {}}
                  />

                  <EditableField
                    label="Phone Number (फ़ोन नंबर)"
                    name="phone"
                    value={formData.phone}
                    isEditing={false}
                    isLoading={isUpdating && editingField === "phone"}
                    required
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    disabled
                    onEdit={() => {}}
                    onSave={() => {}}
                    onCancel={() => {}}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, phone: value }))
                    }
                  />

                  <EditableField
                    label="Date of Birth (जन्म तिथि)"
                    name="dob"
                    value={formData.dob}
                    type="date"
                    isEditing={false}
                    isLoading={isUpdating && editingField === "dob"}
                    placeholder="Select your date of birth"
                    disabled
                    onEdit={() => {}}
                    onSave={() => {}}
                    onCancel={() => {}}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, dob: value }))
                    }
                  />

                  <EditableField
                    label="Gender (लिंग)"
                    name="gender"
                    value={formData.gender}
                    type="select"
                    options={GENDERS}
                    isEditing={editingField === "gender"}
                    isLoading={isUpdating && editingField === "gender"}
                    placeholder="Select gender"
                    onEdit={() => handleFieldEdit("gender")}
                    onSave={() => handleFieldSave("gender")}
                    onCancel={() => handleFieldCancel("gender")}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, gender: value }))
                    }
                  />

                  <EditableField
                    label="Blood Group (रक्त समूह)"
                    name="blood_group"
                    value={formData.blood_group}
                    type="select"
                    options={BLOOD_GROUPS}
                    isEditing={editingField === "blood_group"}
                    isLoading={isUpdating && editingField === "blood_group"}
                    placeholder="Select blood group"
                    onEdit={() => handleFieldEdit("blood_group")}
                    onSave={() => handleFieldSave("blood_group")}
                    onCancel={() => handleFieldCancel("blood_group")}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, blood_group: value }))
                    }
                  />

                  <div className="md:col-span-2 space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">
                      Profession (व्यवसाय)
                    </Label>

                    {editingField === "profession" ? (
                      <div className="space-y-2">
                        <div
                          className={cn(
                            "grid gap-3",
                            formData.profession === "Other"
                              ? "grid-cols-1 md:grid-cols-2"
                              : "grid-cols-1"
                          )}
                        >
                          <Select
                            value={formData.profession}
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                profession: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your profession" />
                            </SelectTrigger>
                            <SelectContent>
                              {professionOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {formData.profession === "Other" && (
                            <Input
                              placeholder="Describe your profession"
                              value={otherProfessionDetail}
                              onChange={(e) =>
                                setOtherProfessionDetail(e.target.value)
                              }
                              disabled={isUpdating}
                            />
                          )}
                        </div>

                        {formData.profession === "Other" && (
                          <p className="text-xs text-muted-foreground">
                            This description will replace &quot;Other&quot; when
                            saved.
                          </p>
                        )}

                        <div className="flex gap-2">
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => handleFieldSave("profession")}
                            disabled={isUpdating}
                            className="flex-1 h-9 text-xs sm:text-sm"
                          >
                            {isUpdating ? (
                              <>
                                <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 animate-spin" />
                                <span className="hidden sm:inline">
                                  Saving...
                                </span>
                                <span className="sm:hidden">Save</span>
                              </>
                            ) : (
                              <>
                                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                                Save
                              </>
                            )}
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleFieldCancel("profession")}
                            disabled={isUpdating}
                            className="h-9 text-xs sm:text-sm px-3"
                          >
                            <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                            <span className="hidden sm:inline">Cancel</span>
                            <span className="sm:hidden">No</span>
                          </Button>
                        </div>
                      </div>
                    ) : formData.profession &&
                      formData.profession.trim() !== "" ? (
                      <div
                        onClick={() => handleFieldEdit("profession")}
                        className="px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg bg-background cursor-pointer hover:bg-muted/50 hover:border-primary/50 active:bg-muted transition-all group min-h-[44px] flex items-center"
                      >
                        <p className="text-xs sm:text-sm font-medium break-all">
                          {formData.profession}
                        </p>
                      </div>
                    ) : (
                      <div
                        onClick={() => handleFieldEdit("profession")}
                        className="px-3 py-2.5 sm:px-4 sm:py-3 border border-dashed rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 hover:border-primary/50 transition-all min-h-[44px] flex items-center justify-center"
                      >
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Add Profession (व्यवसाय)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5 sm:gap-2">
                  <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Identity Documents
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <EditableField
                    label="Aadhar Number (आधार नंबर)"
                    name="aadhar_number"
                    value={formData.aadhar_number}
                    isEditing={editingField === "aadhar_number"}
                    isLoading={isUpdating && editingField === "aadhar_number"}
                    placeholder="12-digit Aadhar number"
                    maxLength={12}
                    onEdit={() => handleFieldEdit("aadhar_number")}
                    onSave={() => handleFieldSave("aadhar_number")}
                    onCancel={() => handleFieldCancel("aadhar_number")}
                    onChange={(value) => {
                      const digitsOnly = value.replace(/\D/g, "").slice(0, 12);
                      setFormData((prev) => ({
                        ...prev,
                        aadhar_number: digitsOnly,
                      }));
                    }}
                  />

                  <EditableField
                    label="PAN Number (पैन नंबर)"
                    name="pan_number"
                    value={formData.pan_number}
                    isEditing={editingField === "pan_number"}
                    isLoading={isUpdating && editingField === "pan_number"}
                    placeholder="10-character PAN number"
                    maxLength={10}
                    onEdit={() => handleFieldEdit("pan_number")}
                    onSave={() => handleFieldSave("pan_number")}
                    onCancel={() => handleFieldCancel("pan_number")}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        pan_number: value.toUpperCase(),
                      }))
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5 sm:gap-2">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Address Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {/* <EditableField
                    label="Street Address (सड़क का पता)"
                    name="street"
                    value={formData.street}
                    type="textarea"
                    isEditing={editingField === "street"}
                    isLoading={isUpdating && editingField === "street"}
                    placeholder="House/Flat number, Street name"
                    onEdit={() => handleFieldEdit("street")}
                    onSave={() => handleFieldSave("street")}
                    onCancel={() => handleFieldCancel("street")}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, street: value }))
                    }
                  /> */}

                  <EditableField
                    label="Village / City name (गांव/शहर)"
                    name="city"
                    value={formData.city}
                    isEditing={editingField === "city"}
                    isLoading={isUpdating && editingField === "city"}
                    placeholder="Enter city"
                    onEdit={() => handleFieldEdit("city")}
                    onSave={() => handleFieldSave("city")}
                    onCancel={() => handleFieldCancel("city")}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, city: value }))
                    }
                  />

                  <div className="space-y-2">
                    <Label className="text-xs sm:text-sm">State (राज्य)</Label>
                    {editingField === "state" ? (
                      <>
                        <StateSelect
                          value={formData.state}
                          onValueChange={(val) =>
                            setFormData((prev) => ({ ...prev, state: val }))
                          }
                          onStateChange={(name, id) => {
                            setFormData((prev) => ({
                              ...prev,
                              state: name || "",
                              district: "",
                            }));
                            setSelectedStateId(id);
                          }}
                        />
                        <div className="flex items-center justify-end gap-2 pt-2">
                          <Button
                            size="sm"
                            onClick={() => handleFieldSave("state")}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleFieldCancel("state")}
                          >
                            Cancel
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div
                        onClick={() => setEditingField("state")}
                        className="px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg bg-background cursor-pointer hover:bg-muted/50 hover:border-primary/50 active:bg-muted transition-all min-h-[44px] flex items-center"
                      >
                        <span className="text-sm">
                          {formData.state || "Select state"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs sm:text-sm">
                      District (जिला)
                    </Label>
                    {editingField === "district" ? (
                      <>
                        <DistrictSelect
                          value={formData.district}
                          onValueChange={(val) =>
                            setFormData((prev) => ({ ...prev, district: val }))
                          }
                          stateSelected={Boolean(selectedStateId)}
                          selectedStateId={selectedStateId}
                          selectedStateName={formData.state}
                        />
                        <div className="flex items-center justify-end gap-2 pt-2">
                          <Button
                            size="sm"
                            onClick={() => handleFieldSave("district")}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleFieldCancel("district")}
                          >
                            Cancel
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div
                        onClick={() => setEditingField("district")}
                        className="px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg bg-background cursor-pointer hover:bg-muted/50 hover:border-primary/50 active:bg-muted transition-all min-h-[44px] flex items-center"
                      >
                        <span className="text-sm">
                          {formData.district || "Select district"}
                        </span>
                      </div>
                    )}
                  </div>

                  <EditableField
                    label="Division (मंडल)"
                    name="division"
                    value={formData.division}
                    isEditing={editingField === "division"}
                    isLoading={isUpdating && editingField === "division"}
                    placeholder="Enter division"
                    onEdit={() => handleFieldEdit("division")}
                    onSave={() => handleFieldSave("division")}
                    onCancel={() => handleFieldCancel("division")}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, division: value }))
                    }
                  />

                  <EditableField
                    label="Postal Code (पिन कोड)"
                    name="postal_code"
                    value={formData.postal_code}
                    isEditing={editingField === "postal_code"}
                    isLoading={isUpdating && editingField === "postal_code"}
                    placeholder="6-digit PIN code"
                    maxLength={6}
                    onEdit={() => handleFieldEdit("postal_code")}
                    onSave={() => handleFieldSave("postal_code")}
                    onCancel={() => handleFieldCancel("postal_code")}
                    onChange={(value) => {
                      const digitsOnly = value.replace(/\D/g, "").slice(0, 6);
                      setFormData((prev) => ({
                        ...prev,
                        postal_code: digitsOnly,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
