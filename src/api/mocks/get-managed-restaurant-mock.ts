import { http, HttpResponse } from "msw";
import { GetManagedRestaurantResponse } from "../get-managed-restaurant";

export const getManagedRestaurantMock = http.get<never, never, GetManagedRestaurantResponse>
("/managed-restaurant", ()=> {

  return HttpResponse.json({
    name: "joao",
    id: "123",
    createdAt: new Date(),
    updatedAt: new Date(),
    description: "descricao",
    managerId: "123123",
  });
});