export const currencies = ["BTC", "GBP", "EUR", "JPY", "USD"] as const;

export type Currency = typeof currencies[number];
