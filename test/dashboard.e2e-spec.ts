import { test } from '@playwright/test';

test('display day orders amount metric', async ({ page }) => {
  await page.goto("/", {waitUntil: "networkidle"});
});