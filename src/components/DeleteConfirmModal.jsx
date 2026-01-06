import { AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeleteConfirmModal({ isOpen, itemName, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Red Warning Icon */}
          <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-900">Delete product</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-slate-900">"{itemName}"</span>? 
              This action cannot be undone and will permanently remove the product from our servers.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-slate-50 px-6 py-4 flex flex-col sm:flex-row-reverse gap-3">
        <Button 
          onClick={onConfirm}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 flex items-center justify-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete {itemName}
        </Button>
        <Button 
          variant="outline" 
          onClick={onClose}
          className="border-slate-300 text-slate-700 hover:bg-white"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}