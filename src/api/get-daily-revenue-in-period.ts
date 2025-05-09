import { api } from "@/lib/axios";

export interface GetDailyRevenueInPeriordQuery{
  from?: Date;
  to?: Date;
}

export type GetDailyRevenueInPeriorResponse = {
  date: string;
  receipt: number;
}[];

export async function getDailyRevenueInPerior({from, to} : GetDailyRevenueInPeriordQuery) {
  const response = await api.get<GetDailyRevenueInPeriorResponse>("/metrics/daily-receipt-in-period", {
    params: {
      from,
      to
    }
  });

  return response.data;
}