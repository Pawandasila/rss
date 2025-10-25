import { CheckCircle } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = [
    { number: 1, label: "Basic Info" },
    { number: 2, label: "Contact & Address" },
    { number: 3, label: "Images & Review" },
  ];

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      {steps.map((s, index) => (
        <div key={s.number} className="flex items-center gap-2">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
              currentStep >= s.number
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted-foreground/30 text-muted-foreground"
            }`}
          >
            {currentStep > s.number ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              s.number
            )}
          </div>
          <span
            className={`text-sm font-medium ${
              currentStep >= s.number ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {s.label}
          </span>
          {index < steps.length - 1 && (
            <div className="h-0.5 w-12 bg-muted-foreground/30" />
          )}
        </div>
      ))}
    </div>
  );
}
