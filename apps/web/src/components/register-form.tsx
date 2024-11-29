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
import { register } from "@/services/auth/auth-service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion"; // Importando o motion

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
      <motion.div
        className="hidden md:flex flex-col justify-center items-center min-h-screen w-1/2 px-8 py-12 bg-gradient-to-tl from-zinc-950 to-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-14">
          <img
            src={userComputer}
            alt="Imagem de usuário com computador"
            className="max-w-md"
          />
        </div>

        <Card className="flex flex-col items-start px-6 w-full bg-transparent shadow-none border-none rounded-none">
          <CardTitle className="text-3xl font-semibold text-white mb-4">
            Olá, seja bem-vindo(a)
          </CardTitle>
          <blockquote className="text-sm font-light text-zinc-300">
            Antes de iniciar a utilização do sistema, será necessário cadastrar
            algumas informações suas.
          </blockquote>
          <Link
            to="/sign-in"
            className="mt-4 block text-xs text-zinc-400 hover:underline"
          >
            Já tem uma conta?
          </Link>
        </Card>
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 flex flex-col space-y-2 px-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl mx-auto px-4 bg-transparent shadow-none">
          <CardContent>
            <CardHeader className="px-0">
              <CardTitle className="text-2xl font-semibold">Cadastro</CardTitle>
              <CardDescription className="text-sm">
                Preencha os campos abaixo para criar sua conta.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <Label htmlFor="name">
                    Nomes <span className="text-sm text-red-500">*</span>
                  </Label>
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
                  <Label htmlFor="email">
                    E-mail <span className="text-sm text-red-500">*</span>
                  </Label>
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
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <Label htmlFor="password">
                    Senha <span className="text-sm text-red-500">*</span>
                  </Label>
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
                  <Label htmlFor="phone">
                    Telefone <span className="text-sm text-red-500">*</span>
                  </Label>
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

                <div className="">
                  <Label htmlFor="limit">
                    Limite <span className="text-sm text-red-500">*</span>
                  </Label>
                  <Input
                    id="limit"
                    type="number"
                    placeholder="Digite o limite"
                    className="mb-2"
                    {...formRegister("limit")}
                  />
                  {errors.limit && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.limit.message}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <Label htmlFor="role">Função*</Label>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma função" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="admin">Administrador</SelectItem>
                            <SelectItem value="user">Usuário</SelectItem>
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

                <div>
                  <Label htmlFor="institution">
                    Instituição <span className="text-sm text-red-500">*</span>
                  </Label>
                  <Input
                    id="institution"
                    type="text"
                    placeholder="Nome da instituição"
                    className="mb-2"
                    {...formRegister("institution")}
                  />
                  {errors.institution && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.institution.message}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-1 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <Label htmlFor="profilePicture">
                    Foto de Perfil{" "}
                    <span className="text-sm text-red-500">*</span>
                  </Label>
                  <Input
                    id="profilePicture"
                    type="text"
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
              </motion.div>

              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    "Cadastrar"
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
