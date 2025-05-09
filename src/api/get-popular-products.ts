import { api } from "@/lib/axios";

export type GetPopularOrdersResponse = {
  product: string;
  amount: number;
}[];

export async function getPopularOrders() {
  const response = await api.get<GetPopularOrdersResponse>("/metrics/popular-products");

  return response.data;
}