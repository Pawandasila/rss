import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  step: number;
  loading: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function FormNavigation({
  step,
  loading,
  onBack,
  onNext,
  onSubmit,
}: FormNavigationProps) {
  return (
    <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={step === 1 || loading}
      >
        Back
      </Button>

      <div className="flex gap-2">
        {step < 3 ? (
          <Button onClick={onNext}>Next</Button>
        ) : (
          <Button onClick={onSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit for Review"}
          </Button>
        )}
      </div>
    </div>
  );
}
