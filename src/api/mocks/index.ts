import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { getDayOrdersAmountMock } from "./get-day-orders-amount";
import { getDailyInPeriodMock } from "./get-day-revenue-in-period";
import { getMonthCanceledOrdersAmountMock } from "./get-month-canceled-orders-amount";
import { getMonthOrdersAmountMock } from "./get-month-orders-amount";
import { getMonthRevenuetMock } from "./get-month-revenue";
import { registerRestaurantMock } from "./register-restaurante-mock";
import { signInMock } from "./sign-in.mock";
import { getPopularProductsMock } from "./get-popular-products";

export const worker = setupWorker(
  getDayOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthRevenuetMock,
  registerRestaurantMock, 
  signInMock,
  getDailyInPeriodMock,
  getPopularProductsMock
);

export async function enableMSW() {
  if(env.MODE !== "test"){
    return;
  }
  
  await worker.start();
}