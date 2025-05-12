import { http, HttpResponse } from "msw";
import { RegisterRestaurantBody } from "../register-restaurant";

export const registerRestaurantMock = http.post<never, RegisterRestaurantBody>("/restaurants", async ({ request })=> {
  const { restaurantName } = await request.json();

  console.log(restaurantName);

  if(restaurantName === "Pizza Shop"){
    console.log("entrou aqui");
    return new HttpResponse(null, { status: 201 });
  }

  console.log("passou aqui");
  return new HttpResponse(null, {status: 400});
});