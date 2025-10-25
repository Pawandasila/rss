import { ArrowLeft, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  onBackClick: () => void;
}

export function PageHeader({ onBackClick }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <Button variant="ghost" onClick={onBackClick} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Building2 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Register Your Business
          </h1>
          <p className="text-muted-foreground">
            Join our business directory and reach more customers
          </p>
        </div>
      </div>
    </div>
  );
}
