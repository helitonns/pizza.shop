import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OrderStatus } from "./order-status";

describe("Order Status", ()=> {

  it("should display the right text when order status is peding", ()=> {
    const wraper = render(<OrderStatus status="pending"/>);
    const statusText = wraper.getByText("Pendente");
    const badgeElement = wraper.getByTestId("badge");
    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-slate-400");
  });
  
  it("should display the right text when order status is canceled", ()=> {
    const wraper = render(<OrderStatus status="canceled"/>);
    const statusText = wraper.getByText("Cancelado");
    const badgeElement = wraper.getByTestId("badge");
    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-rose-500");
  });
  
  it("should display the right text when order status is delivering", ()=> {
    const wraper = render(<OrderStatus status="delivering"/>);
    const statusText = wraper.getByText("Em entrega");
    const badgeElement = wraper.getByTestId("badge");
    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-amber-500");
  });
  
  it("should display the right text when order status is delivered", ()=> {
    const wraper = render(<OrderStatus status="delivered"/>);
    const statusText = wraper.getByText("Entregue");
    const badgeElement = wraper.getByTestId("badge");
    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-emerald-500");
  });
  
  it("should display the right text when order status is processing", ()=> {
    const wraper = render(<OrderStatus status="processing"/>);
    const statusText = wraper.getByText("Em preparo");
    const badgeElement = wraper.getByTestId("badge");
    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-cyan-500");
  });

});