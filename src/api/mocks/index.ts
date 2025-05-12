import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { getDayOrdersAmountMock } from "./get-day-orders-amount-mock";
import { getDailyInPeriodMock } from "./get-day-revenue-in-period-mock";
import { getManagedRestaurantMock } from "./get-managed-restaurant-mock";
import { getMonthCanceledOrdersAmountMock } from "./get-month-canceled-orders-amount-mock";
import { getMonthOrdersAmountMock } from "./get-month-orders-amount-mock";
import { getMonthRevenuetMock } from "./get-month-revenue-mock";
import { getPopularProductsMock } from "./get-popular-products-mock";
import { getProfiletMock } from "./get-profile-mock";
import { registerRestaurantMock } from "./register-restaurante-mock";
import { signInMock } from "./sign-in.mock";
import { updateProfileMock } from "./update-profile-mock";

export const worker = setupWorker(
  getDayOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthRevenuetMock,
  registerRestaurantMock, 
  signInMock,
  getDailyInPeriodMock,
  getPopularProductsMock,
  getProfiletMock,
  getManagedRestaurantMock,
  updateProfileMock,
);

export async function enableMSW() {
  if(env.MODE !== "test"){
    return;
  }
  
  await worker.start();
}