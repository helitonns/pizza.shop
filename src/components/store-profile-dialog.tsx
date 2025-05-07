import { getManagedRestaurant, GetManagedRestaurantResponse } from "@/api/get-managed-restaurant";
import { updateProfile } from "@/api/update-profile";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable()
});

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

//==========================================================================================
export function StoreProfileDialog(){
  const queryClient = useQueryClient();
  
  const { data: managedRestaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  });

  const { register, handleSubmit, formState: {isSubmitting} } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? ""
    }
  });

  function updateManagedRestaurantCache({name, description}: StoreProfileSchema){
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>(["managed-restaurant"]);

      if(cached){
        queryClient.setQueryData<GetManagedRestaurantResponse>(["managed-restaurant"], {
          ...cached,
          name,
          description
        });
      }

      return { cached };
  }

  //interface otimista, a invez de utlizar o onSuccess, que executa so depois da requisicao,
  //trocamos por onMutatio, que executa antes da requisicao,
  //caso ocorra erro, reexecutamos a funcao para atualizar com os dados antes do erro
  //estregia que deve ser usada quando a possibilidade de erros e baixa
  const { mutateAsync: updateProfileFn} = useMutation({
    mutationFn: updateProfile,
    onMutate({name, description}){
      const { cached } = updateManagedRestaurantCache({name, description});

      return {previousProfile: cached};
    },
    onError(_,__, context){
      if(context?.previousProfile){
        updateManagedRestaurantCache(context.previousProfile);
      }
    }
  });

  async function handleUpdateProfile(data: StoreProfileSchema){
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description
      });

      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Falha ao atualizar o perfil, tente novamente!");
    }
  }
  
  return(
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="py-4 space-y-4 ">
          <div className="grid items-center grid-cols-4 gap-4">
            <div className="flex justify-end">
              <Label htmlFor="name">Nome</Label>
            </div>
            <Input className="col-span-3" id="name" {...register("name")}/>
          </div>
          
          <div className="grid items-center grid-cols-4 gap-4">
            <div className="flex justify-end">
              <Label htmlFor="description">Descrição</Label>
            </div>
            <Textarea className="col-span-3" id="description" {...register("description")}/>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button type="submit" variant="sucess" disabled={isSubmitting}>Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}