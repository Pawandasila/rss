import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type PersonalDetailsStepProps = {
  formData: {
    name: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    profession: string;
    aadhar_number?: string;
    pan_number?: string;
    blood_group?: string;
    referred_by?: string;
  };
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
  readOnlyFields?: Partial<Record<string, boolean>>;
  professions?: string[];
};

const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const containsHindi = (text: string) => {
  return /[\u0900-\u097F]/.test(text);
};

const handleEnglishOnlyInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const char = e.key;
  if (containsHindi(char) || /[\u0900-\u097F]/.test(char)) {
    e.preventDefault();
    return false;
  }
};

const handleEnglishOnlyPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  const pastedText = e.clipboardData.getData("text");
  if (containsHindi(pastedText)) {
    e.preventDefault();
    toast.error("कृपया केवल अंग्रेजी में टाइप करें (हिंदी में नहीं)");
    return false;
  }
};

export const PersonalDetailsStep = ({
  formData,
  errors,
  onChange,
  readOnlyFields,
  professions,
}: PersonalDetailsStepProps) => {
  const professionsToDisplay =
    professions && professions.length > 0
      ? professions.map((p) => ({
          value: p.toLowerCase().replace(/\s+/g, "-"),
          label: p,
        }))
      : [];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            Full name{" "}
            <span className="text-muted-foreground text-xs">(पूरा नाम)</span>
          </Label>
          {readOnlyFields?.name ? (
            <div className="px-3 py-1 h-9 rounded-md border bg-transparent">
              {formData.name}
            </div>
          ) : (
            <Input
              id="name"
              value={formData.name}
              onKeyPress={handleEnglishOnlyInput}
              onPaste={handleEnglishOnlyPaste}
              onChange={(e) => {
                const value = e.target.value;
                if (/[\u0900-\u097F]/.test(value)) {
                  toast.error("कृपया केवल अंग्रेजी में नाम लिखें");
                  const cleanValue = value.replace(/[\u0900-\u097F]/g, "");
                  onChange("name", cleanValue);
                } else {
                  onChange("name", value);
                }
              }}
              placeholder="Enter your name"
            />
          )}
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>
            Date of birth{" "}
            <span className="text-muted-foreground text-xs">(जन्म तिथि)</span>
          </Label>
          {readOnlyFields?.dob ? (
            <div className="px-3 py-1 h-9 rounded-md border bg-transparent">
              {formData.dob ? format(new Date(formData.dob), "PPP") : ""}
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.dob && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dob ? (
                    format(new Date(formData.dob), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={formData.dob ? new Date(formData.dob) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      const age = calculateAge(date);
                      // if (age < 18) {
                      //   toast.error("You must be at least 18 years old to register.");
                      //   return;
                      // }
                      if (age > 100) {
                        toast.error("Please enter a valid date of birth.");
                        return;
                      }
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(
                        2,
                        "0"
                      );
                      const day = String(date.getDate()).padStart(2, "0");
                      onChange("dob", `${year}-${month}-${day}`);
                    }
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
          {errors.dob && (
            <p className="text-sm text-destructive">{errors.dob}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>
            Gender <span className="text-muted-foreground text-xs">(लिंग)</span>
          </Label>
          {readOnlyFields?.gender ? (
            <div className="px-3 py-1 h-9 rounded-md border bg-transparent">
              {formData.gender}
            </div>
          ) : (
            <Select
              value={formData.gender}
              onValueChange={(value) => onChange("gender", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          )}
          {errors.gender && (
            <p className="text-sm text-destructive">{errors.gender}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">
            Mobile number{" "}
            <span className="text-muted-foreground text-xs">(फ़ोन नंबर)</span>
          </Label>
          {readOnlyFields?.phone ? (
            <div className="px-3 py-1 h-9 rounded-md border bg-transparent">
              {formData.phone}
            </div>
          ) : (
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              maxLength={10}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="Enter your mobile number"
            />
          )}
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="aadhar_number">
            Aadhar Number{" "}
            <span className="text-muted-foreground text-xs">(आधार संख्या)</span>
          </Label>
          <Input
            id="aadhar_number"
            type="text"
            maxLength={12}
            value={formData.aadhar_number || ""}
            onChange={(e) =>
              onChange("aadhar_number", e.target.value.replace(/[^0-9]/g, ""))
            }
            placeholder="Enter 12-digit Aadhar number"
          />
          <p className="text-xs text-muted-foreground">
            Format: 12 digits (e.g., 123456789012)
          </p>
          {errors.aadhar_number && (
            <p className="text-sm text-destructive">{errors.aadhar_number}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="pan_number">
            PAN Number{" "}
            <span className="text-muted-foreground text-xs">(पैन नंबर)</span>
          </Label>
          <Input
            id="pan_number"
            type="text"
            maxLength={10}
            value={formData.pan_number || ""}
            onChange={(e) =>
              onChange("pan_number", e.target.value.toUpperCase())
            }
            placeholder="Enter PAN number (ABCDE1234F)"
          />
          <p className="text-xs text-muted-foreground">
            Format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)
          </p>
          {errors.pan_number && (
            <p className="text-sm text-destructive">{errors.pan_number}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="blood_group">
          Blood Group{" "}
          <span className="text-muted-foreground text-xs">(रक्त समूह)</span>
        </Label>
        <Select
          value={formData.blood_group || ""}
          onValueChange={(value) => onChange("blood_group", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select blood group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
          </SelectContent>
        </Select>
        {errors.blood_group && (
          <p className="text-sm text-destructive">{errors.blood_group}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>
          Profession{" "}
          <span className="text-muted-foreground text-xs">(व्यवसाय)</span>
        </Label>
        {readOnlyFields?.profession ? (
          <div className="px-3 py-1 h-9 rounded-md border bg-transparent">
            {formData.profession}
          </div>
        ) : (
          <Select
            value={formData.profession}
            onValueChange={(value) => onChange("profession", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {professionsToDisplay.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {errors.profession && (
          <p className="text-sm text-destructive">{errors.profession}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email address{" "}
          <span className="text-muted-foreground text-xs">(ईमेल)</span>
        </Label>
        {readOnlyFields?.email ? (
          <div className="px-3 py-1 h-9 rounded-md border bg-transparent">
            {formData.email}
          </div>
        ) : (
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="name@example.com"
          />
        )}
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="referred_by">
          Referral Code{" "}
          <span className="text-muted-foreground">(रेफरल कोड)</span>{" "}
          <span className="text-muted-foreground text-xs">(Optional)</span>
        </Label>
        <Input
          id="referred_by"
          type="text"
          value={formData.referred_by || ""}
          onChange={(e) => onChange("referred_by", e.target.value)}
          placeholder="Enter referral code if you have one"
          disabled={readOnlyFields?.referred_by}
          readOnly={readOnlyFields?.referred_by}
        />
        {readOnlyFields?.referred_by && (
          <p className="text-xs text-muted-foreground mt-1">
            Referral code from invitation link (cannot be changed)
          </p>
        )}
        {errors.referred_by && (
          <p className="text-sm text-destructive">{errors.referred_by}</p>
        )}
      </div>
    </div>
  );
};
