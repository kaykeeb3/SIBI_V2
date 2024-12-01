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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { login } from "@/services/auth/auth-service";
import { toast } from "sonner";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Digite um e-mail válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [showPassword, setShowPassword] = useState(
    searchParams.get("showPassword") === "true"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending }: UseMutationResult<any, Error, LoginFormData> =
    useMutation({
      mutationFn: (data: LoginFormData) => login(data),
      onSuccess: () => {
        toast.success("Login realizado com sucesso!", {
          duration: 2000,
        });
        navigate("/", { replace: true });
      },
      onError: () => {
        toast.error("Erro ao fazer login", {
          description: "Verifique suas credenciais e tente novamente.",
          duration: 2000,
        });
      },
    });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  const togglePasswordVisibility = () => {
    const newShowPassword = !showPassword;
    setShowPassword(newShowPassword);

    // Atualizar o parâmetro na URL para refletir o estado
    const updatedSearchParams = new URLSearchParams(location.search);
    updatedSearchParams.set("showPassword", newShowPassword.toString());

    // Atualizar a URL sem redirecionar a página
    navigate(
      {
        pathname: location.pathname,
        search: `?${updatedSearchParams.toString()}`,
      },
      { replace: true }
    );
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-between relative">
      <div className="w-full px-2 md:w-1/2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-none px-20 shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl text-center font-normal">
                  Entre na sua conta
                </CardTitle>
                <CardDescription className="text-center text-zinc-500">
                  Se você já possui um cadastro no sistema, insira suas
                  informações de login abaixo.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-1">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Label htmlFor="email" className="text-black">
                    E-mail <span className="text-sm text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    className="mt-1 border-zinc-400 placeholder:text-zinc-600 placeholder:font-light hover:border-primary focus:hover:border-none"
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Label htmlFor="password" className="text-black">
                    Senha <span className="text-sm text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      className="mt-1 border-zinc-400 pr-10 placeholder:text-zinc-600 placeholder:font-light hover:border-primary focus:hover:border-none"
                      {...register("password")}
                      aria-invalid={errors.password ? "true" : "false"}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-600 hover:text-zinc-800 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOffIcon size={18} />
                      ) : (
                        <EyeIcon size={18} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-xs text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button
                    type="submit"
                    className="w-full rounded-lg py-2 text-white hover:bg-blue-700 mt-4"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      </div>
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </motion.div>

                <div className="mt-6 text-center text-sm">
                  <div className="my-4 flex items-center justify-center">
                    <hr className="flex-grow border-zinc-300" />
                    <span className="mx-3 text-black">ou continue com</span>
                    <hr className="flex-grow border-zinc-300" />
                  </div>
                  <Link
                    to="/sign-up"
                    className="mt-4 flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-zinc-800 transition-colors hover:bg-zinc-200"
                  >
                    Cadastrar-se
                  </Link>
                </div>

                <Card className="text-center text-xs text-gray-500 pt-4 bg-transparent border-none shadow-none">
                  Biblioteca virtual © 2024 Todos os direitos reservados.
                  <br />
                  <Link
                    to="/terms"
                    className="text-primary font-light text-xs hover:text-primary/60"
                  >
                    Termos de uso
                  </Link>{" "}
                  e{" "}
                  <Link
                    to="/privacy"
                    className="text-primary font-light text-xs hover:text-primary/60"
                  >
                    e Política de privacidade
                  </Link>
                  .
                </Card>
              </CardContent>
            </Card>
          </motion.div>
        </form>
      </div>

      <div className="hidden h-screen w-3/4 flex-col justify-between bg-gradient-to-tl from-black to-gray-800 p-8 md:flex relative">
        <div className="w-full h-full bg-[url('@/public/assets/bg-stars.svg')] bg-cover bg-center" />

        <CardDescription className="mt-auto overflow-hidden">
          <blockquote className="text-xs font-light text-zinc-300">
            "A tecnologia é apenas uma ferramenta. No que se refere a motivar e
            inspirar pessoas, o professor é o mais importante"
          </blockquote>
          <span className="mt-4 block text-sm text-zinc-400 hover:underline">
            Bill Gates
          </span>
        </CardDescription>

        {/* Blur */}
        <div className="absolute top-1/2 left-1/2 h-[288px] w-[526px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-primary opacity-50 blur-full" />
      </div>
    </div>
  );
}
