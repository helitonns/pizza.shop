import { http, HttpResponse } from "msw";
import { GetDailyRevenueInPeriorResponse } from "../get-daily-revenue-in-period";

export const getDailyInPeriodMock = http.get<never, never, GetDailyRevenueInPeriorResponse>
("/metrics/daily-receipt-in-period", ()=> {

  return HttpResponse.json([
    {date: "01/01/2025", receipt: 2000},
    {date: "02/01/2025", receipt: 3000},
    {date: "03/01/2025", receipt: 4000},
    {date: "04/01/2025", receipt: 3500},
    {date: "05/01/2025", receipt: 2500},
    {date: "06/01/2025", receipt: 1500},
    {date: "07/01/2025", receipt: 2000},
  ]);
});