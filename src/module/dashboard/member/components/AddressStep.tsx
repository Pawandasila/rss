import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CountrySelect,
  StateSelect,
  DistrictSelect,
  MandalSelect,
} from "@/module/country/components/country-select";
import { useState } from "react";

type AddressStepProps = {
  formData: {
    city: string;
    sub_district: string;
    district: string;
    mandal?: string;
    state: string;
    postal_code: string;
  };
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
  stateOptions?: string[];
  readOnlyFields?: Partial<Record<string, boolean>>;
};

export const AddressStep = ({
  formData,
  errors,
  onChange,
  readOnlyFields,
}: AddressStepProps) => {
  const [country] = useState("India");
  const [selectedStateId, setSelectedStateId] = useState<number | undefined>(
    undefined
  );
  const [selectedDistrictId, setSelectedDistrictId] = useState<
    number | undefined
  >(undefined);

  return (
    <div className="space-y-6">
      {/* Country */}
      <CountrySelect
        label="Country"
        value={country}
        onValueChange={() => {}}
        required
        disabled
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {/* State */}
        <div className="space-y-2">
          {readOnlyFields?.state ? (
            <>
              <Label>
                State{" "}
                <span className="text-muted-foreground text-xs">(राज्य)</span>
              </Label>
              <div className="px-3 py-1 h-9 rounded-md border bg-transparent">
                {formData.state}
              </div>
            </>
          ) : (
            <StateSelect
              label={
                <>
                  State{" "}
                  <span className="text-muted-foreground text-xs">(राज्य)</span>
                </>
              }
              value={formData.state}
              onValueChange={(value) => {
                onChange("state", value);
                onChange("district", "");
              }}
              onStateChange={(stateName, stateId) => {
                setSelectedStateId(stateId);
              }}
              countrySelected={!!country}
              required
              error={errors.state}
            />
          )}
        </div>

        {/* District */}
        <div className="space-y-2">
          {readOnlyFields?.district ? (
            <>
              <Label htmlFor="district">
                District{" "}
                <span className="text-muted-foreground text-xs">(जिला)</span>
              </Label>
              <div className="px-3 py-1 h-9 rounded-md border bg-transparent">
                {formData.district}
              </div>
            </>
          ) : (
            <DistrictSelect
              label={
                <>
                  District{" "}
                  <span className="text-muted-foreground text-xs">(जिला)</span>
                </>
              }
              value={formData.district}
              onValueChange={(value) => onChange("district", value)}
              stateSelected={!!formData.state}
              selectedStateId={selectedStateId}
              selectedStateName={formData.state}
              onDistrictChange={(_, districtId) =>
                setSelectedDistrictId(districtId)
              }
              required
              error={errors.district}
            />
          )}
        </div>
      </div>

      {/* Mandal */}
      <div className="space-y-2">
        <MandalSelect
          label={
            <>
              Mandal{" "}
              <span className="text-muted-foreground text-xs">(मंडल)</span>
            </>
          }
          value={formData.mandal}
          onValueChange={(value) => onChange("mandal", value)}
          districtSelected={!!formData.district}
          selectedDistrictId={selectedDistrictId}
          selectedDistrictName={formData.district}
          required
          error={errors.mandal}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="sub_district">
            Tehsil{" "}
            <span className="text-muted-foreground text-xs">(तहसील)</span>
          </Label>
          {readOnlyFields?.sub_district ? (
            <div className="px-3 py-1 h-9 rounded-md border bg-transparent">
              {formData.sub_district}
            </div>
          ) : (
            <Input
              id="sub_district"
              value={formData.sub_district}
              onChange={(e) => onChange("sub_district", e.target.value)}
              placeholder="Enter tehsil"
            />
          )}
          {errors.sub_district && (
            <p className="text-sm text-destructive">{errors.sub_district}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">
            Village / City name{" "}
            <span className="text-muted-foreground text-xs">(गांव/शहर)</span>
          </Label>
          {readOnlyFields?.city ? (
            <div className="px-3 py-1 h-9 rounded-md border bg-transparent">
              {formData.city}
            </div>
          ) : (
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => onChange("city", e.target.value)}
              placeholder="Enter village or city"
            />
          )}
          {errors.city && (
            <p className="text-sm text-destructive">{errors.city}</p>
          )}
        </div>
      </div>

      <div className="space-y-2 sm:max-w-xs">
        <Label htmlFor="postal_code">
          PIN code{" "}
          <span className="text-muted-foreground text-xs">(पिन कोड)</span>
        </Label>
        {readOnlyFields?.postal_code ? (
          <div className="px-3 py-1 h-9 rounded-md border bg-transparent">
            {formData.postal_code}
          </div>
        ) : (
          <Input
            id="postal_code"
            inputMode="numeric"
            maxLength={6}
            value={formData.postal_code}
            onChange={(e) => onChange("postal_code", e.target.value)}
            placeholder="Enter PIN code"
          />
        )}
        {errors.postal_code && (
          <p className="text-sm text-destructive">{errors.postal_code}</p>
        )}
      </div>
    </div>
  );
};
