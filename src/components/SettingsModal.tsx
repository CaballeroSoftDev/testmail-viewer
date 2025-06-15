
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SettingsForm } from "./SettingsForm"

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (apiKey: string, namespace: string) => void
  apiKey: string | null
  namespace: string | null
}

export function SettingsModal({
  open,
  onOpenChange,
  onSave,
  apiKey,
  namespace,
}: SettingsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Enter your TestMail.app API Key and Namespace. You can update them
            here anytime.
          </DialogDescription>
        </DialogHeader>
        <SettingsForm
          onSave={onSave}
          apiKey={apiKey}
          namespace={namespace}
        />
      </DialogContent>
    </Dialog>
  )
}
