"use client";

import { useState } from "react";

export default function AddReceipt() {
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState("");
  const [accountId, setAccountId] = useState("");
  const [items, setItems] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    let parsedItems;
    try {
      parsedItems = JSON.parse(items);
      if (!Array.isArray(parsedItems) && typeof parsedItems !== "object") {
        throw new Error("Items must be a JSON object or array");
      }
    } catch (err: any) {
      setError("Invalid JSON in items: " + err.message);
      return;
    }

 const payload = {
  account_id: parseInt(accountId),
  amount: parseFloat(amount),
  vendor,
  items: JSON.stringify(parsedItems), // convert array/object to string
  date: new Date().toISOString(),
  created_at: new Date().toISOString()
};

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Receipt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create receipt");
      }

      setMessage("Receipt added successfully!");
      setVendor("");
      setAmount("");
      setAccountId("");
      setItems("");
    } catch (err: any) {
      setError("Error creating receipt: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h1>Add Receipt</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="text"
          placeholder="Vendor"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Account ID"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          required
        />
        <textarea
          placeholder='Items as JSON, e.g. [{"name":"apple","price":10}]'
          value={items}
          onChange={(e) => setItems(e.target.value)}
          required
          rows={5}
        />
        <button type="submit" style={{ padding: 10 }}>Add Receipt</button>
      </form>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      {message && <p style={{ color: "green", marginTop: 10 }}>{message}</p>}
    </div>
  );
}
