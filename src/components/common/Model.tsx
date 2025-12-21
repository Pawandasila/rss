"use client";
import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface ModelProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  actionButtons?: ReactNode;
}

const Model = ({
  title,
  isOpen,
  onClose,
  children,
  actionButtons,
}: ModelProps) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 flex-shrink-0">
                <h3 className="text-xl font-bold text-gray-800">
                  {title || "Modal"}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-0 overflow-y-auto flex-grow bg-black">
                {children}
              </div>

              {/* Footer (Actions) */}
              {actionButtons && (
                <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 flex-shrink-0">
                  {actionButtons}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Model;
