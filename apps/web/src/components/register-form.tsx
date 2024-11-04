import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RegisterForm() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="mx-auto max-w-3xl p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Cadastro</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para criar uma conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* 1 campo completo */}
            <div className="grid gap-2">
              <Label htmlFor="name">Nome*</Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                required
              />
            </div>

            {/* 2 campos em 2 colunas: E-mail e Senha */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail*</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha*</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  required
                />
              </div>
            </div>

            {/* 3 campos em 3 colunas: Limite, Papel e Instituição */}
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="limit">Limite*</Label>
                <Input
                  id="limit"
                  type="number"
                  placeholder="Digite o limite"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Função*</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="common">Comum</SelectItem>
                      <SelectItem value="administrator">
                        Administrador
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="institution">Instituição*</Label>
                <Input
                  id="institution"
                  type="text"
                  placeholder="Nome da sua instituição"
                  required
                />
              </div>
            </div>

            {/* 2 campos em 2 colunas: Telefone e Foto de Perfil */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone*</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(xx) xxxxx-xxxx"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profilePicture">Foto de Perfil*</Label>
                <Input
                  id="profilePicture"
                  type="url"
                  placeholder="URL da sua foto de perfil"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-4">
              Cadastrar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
