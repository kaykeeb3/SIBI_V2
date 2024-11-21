import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Notification } from "@/services/socket/socket-service";

interface NotificationDialogProps {
  notifications: Notification[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NotificationDialog: React.FC<NotificationDialogProps> = ({
  notifications,
  isOpen,
  setIsOpen,
}) => {
  // Função para formatar a data
  const formattedDate = (date: string) => {
    return new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Função para categorizar notificações como agendamento ou empréstimo
  const categorizeNotification = (notification: Notification) => {
    return notification.type === "schedule" ? "Agendamento" : "Empréstimo";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-left">
            Central de Notificações
          </DialogTitle>
          <div className="flex justify-start items-center mt-2">
            <DialogDescription className="text-left text-sm text-zinc-700">
              Acompanhe seus agendamentos e empréstimos pendentes
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* Lista de Notificações ou mensagem de ausência */}
        {notifications.length > 0 ? (
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            {notifications.map((notification, index) => {
              const category = categorizeNotification(notification);
              const key = `${notification.id || notification.name || "default-id"}-${index}`;

              return (
                <div
                  key={key}
                  className="flex gap-4 p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className={`flex items-center justify-center h-10 w-10 rounded-full shrink-0 ${
                      category === "Agendamento"
                        ? "bg-violet-100"
                        : "bg-amber-100"
                    }`}
                  >
                    <div
                      className={`text-lg ${
                        category === "Agendamento"
                          ? "text-violet-600"
                          : "text-amber-600"
                      }`}
                    >
                      {category === "Agendamento" ? "📅" : "📚"}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={`font-medium truncate ${
                          category === "Agendamento"
                            ? "text-violet-700"
                            : "text-amber-700"
                        }`}
                      >
                        {notification.name}
                      </h3>
                      <span className="text-xs text-zinc-500 whitespace-nowrap">
                        {formattedDate(notification.startDate)}
                      </span>
                    </div>
                    <div className="mt-1 space-y-1">
                      <p className="text-sm text-zinc-600">
                        Quantidade:{" "}
                        <span className="font-medium">
                          {notification.quantity}
                        </span>
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-zinc-500">
                          {notification.message}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Exibe mensagem quando não houver notificações
          <div className="py-8 text-center text-zinc-500 text-sm">
            Não há notificações no momento.
          </div>
        )}

        <DialogFooter>
          <Button variant="destructive" onClick={() => setIsOpen(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
