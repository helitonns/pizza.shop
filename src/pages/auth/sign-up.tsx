import { registerRestaurant } from "@/api/register-restaurant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

//--------------------------------------------------------------------
const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email()
});

type SignUpForm = z.infer<typeof signUpForm>;
//--------------------------------------------------------------------

export function SignUp(){
  const { register, handleSubmit, formState: {isSubmitting} } = useForm<SignUpForm>();
  const navigate = useNavigate();

  const { mutateAsync: registerRestaurantFn, isError } = useMutation({
    mutationFn: registerRestaurant
  });
  
  async function handlesignUp(data: SignUpForm){
    try {
      registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      });

      if(isError){
        toast.success("Estabelecimento cadastrado com sucesso", {
          action: {
            label: "Login",
            onClick: ()=> navigate(`/sign-in?email=${data.email}`)
          }
        });
      }else {
        toast.error("Erro ao castrar estabelecimento");
      }
      
    } catch (error) {
      toast.error("Erro ao castrar estabelecimento");
    }
  }

  return(
    <>
      <Helmet title="Cadastro"/>

      <div className="p-8">
        <Button variant="outline" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        
        <div className="w-[350px] flex flex-col justify-center gap-6 ">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Criar conta grátis</h1>
            <p className="text-sm text-muted-foreground">Seja um parceiro e comece suas vendas!</p>
          </div>

          <form onSubmit={handleSubmit(handlesignUp)} className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input id="restaurantName" type="text"  {...register("restaurantName")}/>
              
              <Label htmlFor="managerName">Seu nome</Label>
              <Input id="managerName" type="text"  {...register("managerName")}/>
              
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email"  {...register("email")}/>
              
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="tel"  {...register("phone")}/>
            </div>
            
            <Button disabled={isSubmitting} type="submit">Finalizar cadastro</Button>

            <p className="px-6 text-sm leading-relaxed text-center text-muted-foreground">
              Ao continuar,você concorda com nossos{" "}  
              <a href="" className="underline underline-offset-4">termos de serviços</a> e{" "}  
              <a href="" className="underline underline-offset-4">política de privacidade</a>.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}