export type DebtUser = {
  _id: string;
  name: string;
  date: string;
  items: [{ name: string; price: number; _id: string; qty: number }];
  totalPaid: number;
  paidAmount: number;
  unPaidAmount: number;
  paidStatus: "paid" | "unpaid" | "partial";
};
