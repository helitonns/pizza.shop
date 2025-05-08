import { api } from "@/lib/axios";

export interface AprroveOrderParams {
  orderId: string;
}

export async function approvelOrder({ orderId }:AprroveOrderParams) {
  await api.patch(`/orders/${orderId}/approve`);
}