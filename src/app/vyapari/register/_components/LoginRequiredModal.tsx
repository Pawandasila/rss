import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

interface LoginRequiredModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function LoginRequiredModal({
  open,
  onOpenChange,
  onConfirm,
}: LoginRequiredModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
              <LogIn className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">
            Login Required
          </DialogTitle>
          <DialogDescription className="text-center">
            You need to be logged in to register your business. Please login or
            create an account to continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={onConfirm}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Go to Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
