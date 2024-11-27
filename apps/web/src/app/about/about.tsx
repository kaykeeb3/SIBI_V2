import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardItem } from "./_components/card-item";

export function About() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full px-36 py-4">
        <div className="w-full">
          <Card className="mb-8 border-none shadow-none rounded-none">
            <CardHeader className="shadow-none px-4 py-3">
              <CardTitle className="text-2xl font-bold">Visão geral</CardTitle>

              <CardDescription>
                Este documento tem como objetivo apresentar o funcionamento do
                sistema e fornecer alguns exemplos de seu uso
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 py-6">
              <CardTitle className="text-2xl font-bold mb-4">
                O que é o sistema Biblioteca Virtual?
              </CardTitle>

              <CardDescription>
                O Sistema Biblioteca Virtual é uma plataforma administrativa
                desenvolvida para o gerenciamento completo de uma biblioteca de
                forma virtual.
                <br />
                Sua primeira versão foi concebida para solucionar os desafios
                enfrentados no gerenciamento bibliotecário e tem evoluído
                constantemente, com o objetivo de oferecer praticidade,
                segurança e inovação tecnológica.
                <br />
                <br />
                Entre suas funcionalidades, o sistema permite o cadastro de
                livros, controle de empréstimos, gestão de equipamentos,
                agendamentos, envio de notificações e geração de relatórios,
                garantindo uma gestão eficiente e integrada para todos os
                envolvidos.
              </CardDescription>
            </CardContent>

            <div className="flex flex-col space-y-6">
              <CardItem
                title="Autenticação"
                icon="✔"
                description="A autenticação de usuários foi concluída."
                details="Agora, os usuários podem se autenticar."
                status="success"
              />
              <CardItem
                title="Cadastro de Livros"
                icon="✔"
                description="O cadastro de livros está disponível."
                details="Agora, os livros podem ser adicionados ao sistema."
                status="success"
              />
              <CardItem
                title="Empréstimos"
                icon="✔"
                description="O cadastro de empréstimos de usuários está disponível."
                details="Agora, os empréstimos podem ser registrados no sistema."
                status="success" // Status concluído
              />
              <CardItem
                title="Cadastro de Equipamentos"
                icon="✔"
                description="O cadastro de equipamentos está disponível."
                details="Agora, os equipamentos podem ser adicionados ao sistema."
                status="success"
              />
              <CardItem
                title="Agendamentos"
                icon="✔"
                description="O cadastro de agendamentos está disponível."
                details="Agora, agendamentos podem ser realizados com sucesso."
                status="success"
              />
              <CardItem
                title="Notificações"
                icon="!"
                description="A funcionalidade de notificações está em andamento."
                details="Ainda não está 100% implementada."
                status="progress"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
