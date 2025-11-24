"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Receipt {
  receiptId: number;
  accountId: number;
  amount: number;
  date: string;
  vendor: string;
  items: any;
  created_at: string;
}

export default function ReceiptPage() {
  const { id } = useParams<{ id: string }>();
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchReceipt() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/receipts/${id}`);
        if (!res.ok) throw new Error("Receipt not found");

        const data = await res.json();
        setReceipt(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchReceipt();
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (!receipt) return <p>No receipt found for token: {id}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Receipt</h1>

      <p><strong>Vendor:</strong> {receipt.vendor}</p>
      <p><strong>Amount:</strong> {receipt.amount} kr</p>
      <p><strong>Date:</strong> {receipt.date}</p>

      <h2>Items</h2>
      <pre>{JSON.stringify(receipt.items, null, 2)}</pre>

      <a
        href={`/api/pdf?token=${id}`}
        style={{
          display: "inline-block",
          marginTop: 20,
          padding: "10px 15px",
          background: "#000",
          color: "#fff",
          borderRadius: 6,
        }}
      >
        Download PDF
      </a>
    </div>
  );
}
