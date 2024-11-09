import { Toaster } from "@/components/ui/sonner";

export function CustomToaster() {
  return (
    <Toaster
      position="bottom-right"
      richColors
      expand
      closeButton
      theme="light"
      className="font-sans"
      toastOptions={{
        classNames: {
          toast:
            "group toast group flex w-full items-center gap-2 rounded-lg border border-zinc-200 bg-white p-4 shadow-lg",
          title: "text-sm font-semibold text-black",
          description: "text-sm text-black mt-1",
          actionButton: "bg-zinc-900 text-white hover:bg-zinc-800",
          cancelButton: "bg-zinc-100 text-zinc-600 hover:bg-zinc-200",
          error: "bg-red-50 border-red-200",
          success: "bg-green-50 border-green-200",
          warning: "bg-yellow-50 border-yellow-200",
          info: "bg-blue-50 border-blue-200",
        },
        duration: 4000,
      }}
    />
  );
}
