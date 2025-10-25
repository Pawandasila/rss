type ReviewStepProps = {
  formData: {
    name: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    profession: string;
    city: string;
    sub_district: string;
    district: string;
    state: string;
    postal_code: string;
    image: File | null;
    referred_by?: string;
  };
};

const stateOptions = [
  { value: "rajasthan", label: "Rajasthan" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "uttar pradesh", label: "Uttar Pradesh" },
  { value: "madhya pradesh", label: "Madhya Pradesh" },
  { value: "delhi", label: "Delhi" },
  { value: "other", label: "Other" },
];

const professionOptions = [
  { value: "student", label: "Student" },
  { value: "self-employed", label: "Self-employed" },
  { value: "professional", label: "Professional" },
  { value: "service", label: "Service / Job" },
  { value: "retired", label: "Retired" },
  { value: "other", label: "Other" },
];

export const ReviewStep = ({ formData }: ReviewStepProps) => {
  const stateLabel =
    stateOptions.find((option) => option.value === formData.state)?.label ||
    formData.state ||
    "";

  const professionLabel =
    professionOptions.find((option) => option.value === formData.profession)
      ?.label || formData.profession;

  const genderLabel = formData.gender
    ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)
    : "";

  const locality = [formData.city, formData.sub_district, formData.district]
    .filter(Boolean)
    .join(", ");

  const addressLine = [locality, stateLabel].filter(Boolean).join(", ");

  const formattedAddress = addressLine
    ? formData.postal_code
      ? `${addressLine} - ${formData.postal_code}`
      : addressLine
    : formData.postal_code || "—";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground">
          Review & payment
        </h3>
        <p className="text-sm text-muted-foreground">
          Please confirm the information below, then continue to payment to
          finish your application.
        </p>
      </div>
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-md border border-border p-4">
          <dt className="text-xs uppercase text-muted-foreground">Full name</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {formData.name || "—"}
          </dd>
        </div>
        <div className="rounded-md border border-border p-4">
          <dt className="text-xs uppercase text-muted-foreground">
            Date of birth
          </dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {formData.dob || "—"}
          </dd>
        </div>
        <div className="rounded-md border border-border p-4">
          <dt className="text-xs uppercase text-muted-foreground">Gender</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {genderLabel || "—"}
          </dd>
        </div>
        <div className="rounded-md border border-border p-4">
          <dt className="text-xs uppercase text-muted-foreground">
            Profession
          </dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {professionLabel || "—"}
          </dd>
        </div>
        <div className="rounded-md border border-border p-4">
          <dt className="text-xs uppercase text-muted-foreground">Mobile</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {formData.phone || "—"}
          </dd>
        </div>
        <div className="rounded-md border border-border p-4">
          <dt className="text-xs uppercase text-muted-foreground">Email</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {formData.email || "—"}
          </dd>
        </div>
        {formData.referred_by && (
          <div className="rounded-md border border-border p-4">
            <dt className="text-xs uppercase text-muted-foreground">
              Referral Code
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {formData.referred_by}
            </dd>
          </div>
        )}
        <div className="rounded-md border border-border p-4 sm:col-span-2">
          <dt className="text-xs uppercase text-muted-foreground">Address</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {formattedAddress}
          </dd>
        </div>
      </dl>
      <div className="rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Payment note</p>
        <p className="mt-1">
          You&apos;ll be redirected to the secure payment portal to complete
          your membership fee after confirming.
        </p>
        {formData.image && (
          <p className="mt-2 text-xs text-muted-foreground">
            Uploaded photo:{" "}
            <span className="font-medium text-foreground">
              {formData.image.name}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};
