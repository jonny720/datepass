import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        />

        {/* Dialog */}
        <motion.div
          className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl mx-4"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Close button */}
          <button
            onClick={onCancel}
            className="absolute right-4 top-4 rounded-lg p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
            aria-label={cancelLabel}
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className="mb-6">
            <h2 className="mb-2 text-xl font-bold text-stone-900">{title}</h2>
            <p className="text-sm text-stone-600">{description}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <SecondaryButton onClick={onCancel} fullWidth size="lg">
              {cancelLabel}
            </SecondaryButton>
            <PrimaryButton onClick={onConfirm} fullWidth size="lg">
              {confirmLabel}
            </PrimaryButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
