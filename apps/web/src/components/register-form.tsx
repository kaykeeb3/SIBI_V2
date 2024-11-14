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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import userComputer from "@/public/assets/user-computer.svg";
import { Link, useNavigate } from "react-router-dom";
import { register } from "@/services/auth/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  limit: z
    .number({
      required_error: "Limite é obrigatório",
      invalid_type_error: "Limite deve ser um número",
    })
    .min(1, "Limite deve ser maior que 0"),
  role: z.string().min(1, "Função é obrigatória"),
  institution: z
    .string()
    .min(1, "Instituição é obrigatória")
    .max(100, "Nome da instituição muito longo"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "Telefone deve estar no formato (XX) XXXXX-XXXX"
    ),
  profilePicture: z
    .string()
    .url("URL inválida para foto de perfil")
    .min(1, "Foto de perfil é obrigatória"),
});

type FormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const navigate = useNavigate();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Cadastro realizado com sucesso!", {
        duration: 2000,
      });

      reset();
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error("Erro no cadastro", {
        description: "Ocorreu um erro ao tentar cadastrar o usuário.",
        duration: 2000,
      });
      console.error("Erro ao cadastrar usuário:", error);
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  function formatPhoneNumber(value: any) {
    if (!value) return "";

    const cleanedValue = value.replace(/\D/g, "");

    if (cleanedValue.length <= 2) {
      return `(${cleanedValue}`;
    } else if (cleanedValue.length <= 7) {
      return `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2)}`;
    } else if (cleanedValue.length <= 11) {
      return `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2, 7)}-${cleanedValue.slice(7)}`;
    } else {
      return `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2, 7)}-${cleanedValue.slice(7, 11)}`;
    }
  }

  return (
    <div className="flex items-center justify-between min-h-screen bg-white">
      <div className="hidden md:flex flex-col justify-center items-center min-h-screen w-1/2 px-8 py-12 bg-gradient-to-tl from-zinc-950 to-gray-800">
        <div className="flex justify-center mb-14">
          <img
            src={userComputer}
            alt="Imagem de usuário com computador"
            className="max-w-md"
          />
        </div>

        <div className="flex flex-col items-start px-6 w-full">
          <h1 className="text-3xl font-semibold text-white mb-4">
            Olá, seja bem-vindo(a)
          </h1>
          <p className="text-sm text-zinc-200 mb-2 font-normal">
            Antes de iniciar a utilização do sistema, será necessário cadastrar
            algumas informações suas 🤗.
          </p>
          <Link to="/sign-in" className="text-sm text-zinc-300 underline">
            Já tem uma conta?
          </Link>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col space-y-2 px-12">
        <Card className="w-full max-w-2xl mx-auto px-4 bg-transparent  shadow-none">
          <CardContent>
            <CardHeader className="px-0">
              <CardTitle className="text-2xl font-semibold">Cadastro</CardTitle>
              <CardDescription className="text-sm">
                Preencha os campos abaixo para criar sua conta.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome*</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Digite seu nome"
                    className="mb-2"
                    {...formRegister("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">E-mail*</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    className="mb-2"
                    {...formRegister("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Senha*</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="******"
                    className="mb-2"
                    {...formRegister("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Telefone*</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(xx) xxxxx-xxxx"
                    className="mb-2"
                    {...formRegister("phone", {
                      onChange: (e) => {
                        e.target.value = formatPhoneNumber(e.target.value);
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="limit">Limite*</Label>
                  <Input
                    id="limit"
                    type="number"
                    placeholder="Digite o limite"
                    className="mb-2"
                    {...formRegister("limit", { valueAsNumber: true })}
                  />
                  {errors.limit && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.limit.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="role">Função*</Label>
                  <Controller
                    control={control}
                    name="role"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma função" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="USER">Comum</SelectItem>
                            <SelectItem value="ADMIN">Administrador</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.role && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.role.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="institution">Instituição*</Label>
                  <Input
                    id="institution"
                    type="text"
                    placeholder="Digite o nome da instituição"
                    className="mb-2"
                    {...formRegister("institution")}
                  />
                  {errors.institution && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.institution.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="profilePicture">Foto de Perfil*</Label>
                  <Input
                    id="profilePicture"
                    type="url"
                    placeholder="URL da foto de perfil"
                    className="mb-2"
                    {...formRegister("profilePicture")}
                  />
                  {errors.profilePicture && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.profilePicture.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full rounded-lg py-2 text-white transition-colors"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  "Cadastrar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
