<<<<<<< HEAD
import { useToast } from "@/hooks/use-toast"
=======
import { useToast } from '@/hooks/use-toast';
>>>>>>> ec216b7d54be3e4d070f00e859e78c2a8ea759ac
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
<<<<<<< HEAD
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()
=======
  ToastViewport
} from '@/components/ui/toast';

export function Toaster() {
  const { toasts } = useToast();
>>>>>>> ec216b7d54be3e4d070f00e859e78c2a8ea759ac

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
<<<<<<< HEAD
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
=======
              {description && <ToastDescription>{description}</ToastDescription>}
>>>>>>> ec216b7d54be3e4d070f00e859e78c2a8ea759ac
            </div>
            {action}
            <ToastClose />
          </Toast>
<<<<<<< HEAD
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
=======
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
>>>>>>> ec216b7d54be3e4d070f00e859e78c2a8ea759ac
}
