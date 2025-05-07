import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string()
});

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog(){
  const { data: managedRestaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant
  });

  const { register, handleSubmit } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? ""
    }
  });
  
  return(
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form>
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
          <Button type="button" variant="ghost">Cancelar</Button>
          <Button type="submit" variant="sucess">Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}