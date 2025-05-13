import { http, HttpResponse } from "msw";
import { GetOrderDetailsParams, GetOrderDetailsResponse } from "../get-order-details";

export const getOrderDetailMock = http.get<GetOrderDetailsParams, never, GetOrderDetailsResponse>
("/orders/:orderId", ({params})=> {

  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: "Joao da Silva",
      email: "joao@gmail.com",
      phone: "95 99123-2323",
    },
    status: "pending",
    createdAt: new Date().toISOString(),
    totalInCents: 3000,
    orderItems: [
      {
        id: "order-item-1",
        priceInCents: 1000,
        product: {name: "Pizza 4 queijos"},
        quantity: 1
      },
      {
        id: "order-item-2",
        priceInCents: 2000,
        product: {name: "Pizza File com Fritas"},
        quantity: 1
      },
    ]
  });
});