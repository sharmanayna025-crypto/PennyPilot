import { saveAs } from "file-saver";

export function exportTransactionsCSV(transactions) {

  const headers = [
    "Title",
    "Amount",
    "Type",
    "Category",
    "Date"
  ];

  const rows = transactions.map((t) => [
    t.title,
    t.amount,
    t.type,
    t.category,
    t.date
  ]);

  const csvContent = [
    headers,
    ...rows
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob(
    [csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  saveAs(blob, "transactions.csv");
}