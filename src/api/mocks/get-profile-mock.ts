import { http, HttpResponse } from "msw";
import { GetProfileResponse } from "../get-profile";

export const getProfiletMock = http.get<never, never, GetProfileResponse>("/me", ()=> {

  return HttpResponse.json({
    name: "Joao da Silva",
    id: "123123",
    email: "joao@gmail.com",
    phone: "95 99123-2323",
    role: "manager",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
});