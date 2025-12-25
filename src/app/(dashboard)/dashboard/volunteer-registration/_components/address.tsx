"use client";

import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AddressFormData } from "@/module/dashboard/volunteer";
import {
  StateSelect,
  DistrictSelect,
  MandalSelect,
} from "@/module/country/components/country-select";

interface AddressFormProps {
  data: AddressFormData;
  setData: React.Dispatch<React.SetStateAction<AddressFormData>>;
  onNext: () => void;
  onBack?: () => void;
}

const AddressForm = ({ data, setData, onNext, onBack }: AddressFormProps) => {
  const { user } = useAuth();
  const [disabledFields, setDisabledFields] = useState<Record<string, boolean>>(
    {}
  );
  const [selectedStateId, setSelectedStateId] = useState<number | undefined>(
    undefined
  );
  const [selectedDistrictId, setSelectedDistrictId] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    if (!user) return;
    const updatedDisabled: Record<string, boolean> = {};
    const updatedData: Partial<AddressFormData> = {};

    const fields = [
      "street",
      "sub_district",
      "district",
      "city",
      "state",
      "country",
      "postal_code",
      "mandal",
      "hindi_name",
    ];

    fields.forEach((key) => {
      const userValue = user[key as keyof typeof user];
      const currentValue = data[key as keyof AddressFormData];

      if (userValue && (!currentValue || currentValue === "")) {
        updatedData[key as keyof AddressFormData] = String(userValue);
        updatedDisabled[key] = true;
      }

      if (
        userValue &&
        currentValue &&
        String(currentValue) === String(userValue)
      ) {
        updatedDisabled[key] = true;
      }
    });

    if (Object.keys(updatedData).length > 0) {
      setData((prev) => ({ ...prev, ...updatedData }));
    }

    setDisabledFields(updatedDisabled);
  }, [user, data, setData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHindiNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const hindiRegex = /^[\u0900-\u097F\s\u0964\u0965]*$/;

    if (hindiRegex.test(value) || value === "") {
      setData((prev) => ({ ...prev, hindi_name: value }));
    } else {
      toast.error(
        "कृपया केवल हिंदी में नाम लिखें (Please enter name in Hindi only)"
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.street || !data.city || !data.postal_code) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!data.hindi_name || data.hindi_name.trim() === "") {
      toast.error(
        "कृपया हिंदी में नाम दर्ज करें (Please enter your name in Hindi)"
      );
      return;
    }

    // Validate that hindi_name contains only Hindi characters
    const hindiRegex = /^[\u0900-\u097F\s\u0964\u0965]+$/;
    if (!hindiRegex.test(data.hindi_name)) {
      toast.error(
        "कृपया केवल हिंदी में नाम लिखें (Please enter name in Hindi only)"
      );
      return;
    }

    onNext();
  };

  const renderInput = (
    label: string,
    name: keyof AddressFormData,
    required = false,
    placeholder?: string,
    pattern?: string,
    title?: string,
    maxLength?: number
  ) => (
    <div>
      <Label htmlFor={name} className="mb-2 text-sm sm:text-base">
        {label} {required && "*"}
      </Label>

      {disabledFields[name as string] ? (
        <div
          id={String(name)}
          role="textbox"
          aria-readonly="true"
          aria-disabled="true"
          tabIndex={-1}
          className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        >
          {data[name] || ""}
        </div>
      ) : (
        <Input
          id={name as string}
          name={name as string}
          value={data[name] || ""}
          onChange={handleChange}
          placeholder={placeholder}
          pattern={pattern}
          title={title}
          required={required}
          maxLength={maxLength}
          className="h-9 sm:h-10"
        />
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div>
        <Label htmlFor="hindi_name" className="mb-2 text-sm sm:text-base">
          नाम (हिंदी में) / Name in Hindi *
        </Label>
        <Input
          id="hindi_name"
          name="hindi_name"
          value={data.hindi_name || ""}
          onChange={handleHindiNameChange}
          placeholder="अपना नाम हिंदी में लिखें"
          required
          className="font-hindi h-9 sm:h-10"
        />
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          कृपया केवल हिंदी (देवनागरी) में लिखें
        </p>
      </div>
      {renderInput("Street (सड़क)", "street", true, "House No., Street name")}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {renderInput(
          "Sub-District (उप-जिला)",
          "sub_district",
          false,
          "Sub-district or Block"
        )}
        <div className="space-y-2">
          <DistrictSelect
            label={
              <>
                District{" "}
                <span className="text-muted-foreground text-xs">(जिला)</span>
              </>
            }
            value={data.district}
            onValueChange={(value) =>
              setData((prev) => ({ ...prev, district: value }))
            }
            stateSelected={!!data.state}
            selectedStateId={selectedStateId}
            selectedStateName={data.state}
            onDistrictChange={(_, districtId) =>
              setSelectedDistrictId(districtId)
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {renderInput("City (शहर)", "city", true, "City or Town")}
        <div className="space-y-2">
          <StateSelect
            label={
              <>
                State{" "}
                <span className="text-muted-foreground text-xs">(राज्य)</span>
              </>
            }
            value={data.state}
            onValueChange={(value) => {
              setData((prev) => ({
                ...prev,
                state: value,
                district: "",
                mandal: "",
              }));
            }}
            onStateChange={(stateName, stateId) => {
              setSelectedStateId(stateId);
            }}
            countrySelected={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {renderInput("Country (देश)", "country", true, "Country")}
        {renderInput(
          "Postal Code (पिन कोड)",
          "postal_code",
          true,
          "e.g. 110001",
          "^\\d{5,6}$",
          "Enter a valid 5 or 6-digit postal code",
          6
        )}
      </div>
      <div>
        <MandalSelect
          label={
            <>
              Mandal{" "}
              <span className="text-muted-foreground text-xs">(मंडल)</span>
            </>
          }
          value={data.mandal}
          onValueChange={(value) =>
            setData((prev) => ({ ...prev, mandal: value }))
          }
          districtSelected={!!data.district}
          selectedDistrictId={selectedDistrictId}
          selectedDistrictName={data.district}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4 sm:pt-6 border-t">
        {onBack && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="h-9 sm:h-10 w-full sm:w-auto order-2 sm:order-1"
          >
            Back
          </Button>
        )}
        <Button
          type="submit"
          className="h-9 sm:h-10 w-full sm:w-auto order-1 sm:order-2"
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;
