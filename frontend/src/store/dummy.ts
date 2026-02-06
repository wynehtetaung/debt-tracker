import type { amount } from "../types/amount";
import type { DebtUser } from "../types/user";

export const tempStore: DebtUser[] = [
  {
    name: "alice",
    date: "october 21, 2026",
    item: "freelance",
    totalAmount: 2000,
    paidAmount: 4000,
    unPaidAmount: 5000,
    status: "paid",
  },
  {
    name: "bob",
    date: "october 23, 2026",
    item: "editor",
    totalAmount: 4000,
    paidAmount: 3000,
    unPaidAmount: 2000,
    status: "unpaid",
  },
  {
    name: "john",
    date: "october 24, 2026",
    item: "typing",
    totalAmount: 2000,
    paidAmount: 4000,
    unPaidAmount: 5000,
    status: "paid",
  },
];

export const TotalAmount: amount = {
  totalDebt: 22222,
  totalPaid: 3444,
  totalUnPaid: 43553,
};
