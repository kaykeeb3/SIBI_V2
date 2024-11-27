import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CirclePlus, CircleMinus } from "lucide-react";
import { useEffect, useState } from "react";
import { getStatus } from "@/services/api/api-service";

interface Incident {
  date: string;
  message: string;
  details?: string;
  icon?: string;
}

type Status = {
  library: string;
  services: string;
  incidents: Incident[];
  api: string;
  webSystem: string;
  database: string;
  notifications: string;
  [key: string]: string | Incident[]; // Adicionando assinatura de índice
};

export function StatusDashboard() {
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>({
    library: "Carregando...",
    services: "Carregando...",
    incidents: [],
    api: "Carregando...",
    webSystem: "Carregando...",
    database: "Carregando...",
    notifications: "Carregando...",
  });

  const toggleAccordion = (value: string) => {
    setIsOpen((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  };

  // Definindo as classes para os status
  const statusClasses: { [key: string]: string } = {
    Operacional: "text-green-500",
    "Indisponibilidade parcial": "text-yellow-500",
    Erro: "text-red-500",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          libraryStatus,
          servicesStatus,
          incidents,
          api,
          webSystem,
          database,
          notifications,
        } = await getStatus();

        const incidentsWithDetails = incidents.map((incident) => ({
          ...incident,
          details: incident.message || "Sem detalhes disponíveis",
        }));

        setStatus({
          library: libraryStatus,
          services: servicesStatus,
          incidents: incidentsWithDetails,
          api,
          webSystem,
          database,
          notifications,
        });
      } catch (error) {
        console.error("Erro ao buscar status:", error);
        setStatus({
          library: "Erro",
          services: "Erro",
          incidents: [
            {
              date: "",
              message: "Erro ao carregar os dados.",
              details: "Sem detalhes disponíveis",
            },
          ],
          api: "Erro",
          webSystem: "Erro",
          database: "Erro",
          notifications: "Erro",
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full px-36 py-4">
        <Card className="mb-8 border-none shadow-none">
          <CardHeader
            className={`shadow-none bg-transparent ${
              status.library === "Erro" || status.services === "Erro"
                ? "bg-red-500"
                : "bg-sky-500"
            } text-white px-4 py-3 shadow-none rounded`}
          >
            <h1 className="text-lg font-bold">
              {status.library === "Erro" || status.services === "Erro"
                ? "Alguns sistemas apresentam falhas"
                : "Todos os sistemas estão funcionando corretamente"}
            </h1>
          </CardHeader>
        </Card>

        <Accordion type="single" collapsible className="space-y-4 mb-24">
          <AccordionItem value="biblioteca">
            <AccordionTrigger
              className="bg-card-foreground px-4 py-3 text-white"
              onClick={() => toggleAccordion("biblioteca")}
            >
              <div className="flex items-center justify-between w-full">
                <span className="items-center justify-center flex gap-1">
                  {isOpen["biblioteca"] ? (
                    <CirclePlus width={15} />
                  ) : (
                    <CircleMinus width={15} />
                  )}
                  Biblioteca Virtual
                </span>
                <Badge
                  variant="outline"
                  className={`shadow-none bg-transparent hover:bg-transparent ${
                    status.services === "Operacional"
                      ? "bg-green-500"
                      : status.services === "Indisponibilidade parcial"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  } text-white rounded-full p-[6px] mr-2`}
                ></Badge>
              </div>
            </AccordionTrigger>

            <AccordionContent className="py-4 border border-zinc-300 flex justify-between flex-col">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-400 pb-3">
                  <span className="font-normal text-zinc-800 px-3">API</span>
                  <Badge
                    className={`shadow-none bg-transparent hover:bg-transparent ${statusClasses[status.api]}`}
                  >
                    {status.api}
                  </Badge>
                </div>

                <div className="flex justify-between items-center border-b border-zinc-400 pb-3">
                  <span className="font-normal text-zinc-800 px-3">
                    Sistema Web
                  </span>
                  <Badge
                    className={`shadow-none bg-transparent hover:bg-transparent ${statusClasses[status.webSystem]}`}
                  >
                    {status.webSystem}
                  </Badge>
                </div>

                <div className="flex justify-between items-center border-b border-zinc-400 pb-3">
                  <span className="font-normal text-zinc-800 px-3">
                    Banco de Dados
                  </span>
                  <Badge
                    className={`shadow-none bg-transparent hover:bg-transparent ${statusClasses[status.database]}`}
                  >
                    {status.database}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-normal text-zinc-800 px-3">
                    Notificações
                  </span>
                  <Badge
                    className={`shadow-none bg-transparent hover:bg-transparent ${statusClasses[status.notifications]}`}
                  >
                    {status.notifications}
                  </Badge>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="servicos">
            <AccordionTrigger
              className="bg-card-foreground px-4 py-3 text-white"
              onClick={() => toggleAccordion("servicos")}
            >
              <div className="flex items-center justify-between w-full">
                <span className="items-center justify-center flex gap-1">
                  {isOpen["servicos"] ? (
                    <CirclePlus width={15} />
                  ) : (
                    <CircleMinus width={15} />
                  )}
                  Serviços
                </span>
                <Badge
                  variant="outline"
                  className={`shadow-none bg-transparent hover:bg-transparent ${
                    status.services === "Operacional"
                      ? "bg-green-500"
                      : status.services === "Indisponibilidade parcial"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  } text-white rounded-full p-[6px] mr-2`}
                ></Badge>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-4 py-3 border border-zinc-300 flex justify-between">
              <p className="text-zinc-800">Status dos serviços gerais</p>
              <Badge
                className={`shadow-none bg-transparent hover:bg-transparent ${statusClasses[status.services]}`}
              >
                {status.services}
              </Badge>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Exibindo os incidentes formatados */}
        <Card className="flex flex-col space-y-6 border-none shadow-none rounded-none">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-1">Incidentes anteriores</h1>

            {/* Informações adicionais sobre o status do sistema */}
            <CardContent className="text-zinc-800 mb-6 px-0 py-0">
              <CardDescription className="text-zinc-700 mb-2 font-normal">
                Total de incidentes registrados:{" "}
                <span>{status.incidents.length}</span> - Incidentes de alerta
                (erros):{" "}
                <span>
                  {
                    status.incidents.filter(
                      (incident) => incident.icon === "alert"
                    ).length
                  }
                </span>
              </CardDescription>
            </CardContent>

            {/* Lista de incidentes */}
            {status.incidents.map((incident, index) => {
              return (
                <Card
                  key={index}
                  className="relative flex  border-none shadow-none rounded-none"
                >
                  {/* Linha do tempo */}
                  <div className="absolute left-4 top-0 h-full w-[2px] bg-primary" />

                  {/* Ícone do incidente */}
                  <div className="absolute left-0 top-6 w-8 h-8 bg-purple-600 text-white flex items-center justify-center rounded-full">
                    <span className="text-lg font-bold">
                      {incident.icon === "alert" ? "!" : "✔"}
                    </span>
                  </div>

                  {/* Card com as informações do incidente */}
                  <div className="ml-12 bg-card-foreground text-zinc-200 p-4 rounded-lg shadow-lg relative w-full">
                    <div className="absolute -left-2 top-6 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-zinc-50" />

                    <div className="flex items-center space-x-2">
                      {/* Tipo do incidente */}
                      <Badge className="bg-purple-500 text-white px-2 py-1 rounded">
                        {incident.icon === "alert"
                          ? "Incidente"
                          : "Sistema Operacional"}
                      </Badge>
                      {/* Exibindo a data e o dia da semana */}
                      <CardTitle className="text-sm text-zinc-400">
                        {incident.date}
                      </CardTitle>
                    </div>

                    {/* Título do incidente */}
                    <CardTitle className="text-lg font-semibold mt-2">
                      {incident.message}
                    </CardTitle>

                    {/* Detalhes do incidente */}
                    <CardDescription className="text-zinc-400 font-normal mt-1 text-sm">
                      {incident.icon === "alert"
                        ? `Erro ocorrido: ${incident.details || "Sem detalhes disponíveis."}`
                        : "Instabilidade normalizada."}
                    </CardDescription>

                    {/* Exibindo mais detalhes se o incidente tiver um erro */}
                    {incident.icon === "alert" && (
                      <div className="mt-2 p-2 bg-red-100 text-red-600 text-sm rounded">
                        <strong>Erro detectado!</strong> Verifique o sistema
                        imediatamente.
                      </div>
                    )}

                    {/* Exibindo a data do erro se for um incidente */}
                    {incident.icon === "alert" && (
                      <div className="mt-2 text-sm text-zinc-500">
                        <strong>Data do erro:</strong> {incident.date}
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
