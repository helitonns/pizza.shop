import { expect, test } from '@playwright/test';

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: "networkidle"});

  await page.getByLabel("Nome do estabelecimento").fill("Pizza Shop");
  await page.getByLabel("Seu nome").fill("Heliton");
  await page.getByLabel("Seu e-mail").fill("email@gmail.com");
  await page.getByLabel("Seu celular").fill("99176-2323");
  
  await page.getByRole("button", {name: "Finalizar cadastro"}).click();

  const toast = page.getByText("Estabelecimento cadastrado com sucesso");
  expect(toast).toBeVisible();
  //await page.waitForTimeout(200);
});

test('sign up with wrong credentials', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: "networkidle"});

  await page.getByLabel("Nome do estabelecimento").fill("Pizza S****");
  await page.getByLabel("Seu nome").fill("Heliton");
  await page.getByLabel("Seu e-mail").fill("email@gmail.com");
  await page.getByLabel("Seu celular").fill("99176-2323");
  
  await page.getByRole("button", {name: "Finalizar cadastro"}).click();

  const toast = page.getByText("Erro ao castrar estabelecimento");
  expect(toast).toBeVisible();
});

test('navigate to login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: "networkidle"});

  await page.getByRole("link", {name: "Fazer login"}).click();

  expect(page.url()).toContain("/sign-in");
});