import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function LoginForm() {
  return (
    <div className="flex min-h-screen items-center justify-between">
      {/* Left Section: Logo and Quote */}
      <div className="hidden w-1/2 h-screen p-8 bg-zinc-900 text-gray-300 flex-col justify-between md:flex">
        <div className="mt-auto text-base font-light">
          <blockquote>
            "Este sistema foi criado para atender necessidades específicas e
            logo se tornou essencial para economizar tempo e entregar soluções
            com rapidez."
          </blockquote>
          <span className="block mt-4 text-sm">
            Comunidade SIBI - Gerardo José
          </span>
        </div>
      </div>

      {/* Right Section: Login Form */}
      <div className="w-full p-8 md:w-1/2">
        <Card className="border-none px-12 sm:px-16 md:px-24 lg:px-32">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">
              Faça login com sua conta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-gray-400">
                E-mail*
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-400">
                Senha*
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                className="mt-1"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <div className="mt-6 text-center text-sm">
              <div className="flex items-center my-4">
                <hr className="flex-grow border-zinc-700" />
                <span className="mx-3 text-zinc-200">ou continue com</span>
                <hr className="flex-grow border-zinc-700" />
              </div>
              <Link
                to="/register"
                className="mt-4 w-full flex items-center justify-center bg-white hover:bg-zinc-200 p-2 rounded text-zinc-800"
              >
                Cadastrar-se
              </Link>
            </div>
            <div className="mt-4 text-center text-xs text-gray-500">
              Ao continuar, você concorda com nossos{" "}
              <Link to="/terms" className="underline">
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link to="/privacy" className="underline">
                Política de Privacidade
              </Link>
              .
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
