"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Search, Plus, Package, AlertCircle } from "lucide-react";

const MOCK_INVENTORY = [
  { id: "1", name: "Whey Protein (1kg)", category: "Supplement", quantity: 25, minQuantity: 5, price: 2500 },
  { id: "2", name: "Vikings T-Shirt", category: "Merchandise", quantity: 3, minQuantity: 10, price: 699 },
  { id: "3", name: "Gym Gloves", category: "Accessory", quantity: 30, minQuantity: 10, price: 499 },
];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Inventory</h1>
          <p className="text-sm text-gray-400">Manage supplements, merchandise, and equipment.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      <div className="glass rounded-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INVENTORY.map((item) => {
                const isLowStock = item.quantity <= item.minQuantity;
                return (
                  <tr key={item.id} className={isLowStock ? "bg-red-500/5" : ""}>
                    <td className="text-white font-medium">{item.name}</td>
                    <td className="text-gray-300">
                      <span className="bg-[#1A1A1A] px-2 py-1 rounded text-xs border border-[#333]">
                        {item.category}
                      </span>
                    </td>
                    <td className="text-white">
                      {item.quantity} / {item.minQuantity}
                    </td>
                    <td className="text-gray-300">{formatCurrency(item.price)}</td>
                    <td>
                      {isLowStock ? (
                        <span className="flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="w-3 h-3" /> Low Stock
                        </span>
                      ) : (
                        <span className="text-xs text-green-500">In Stock</span>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="text-xs px-2 py-1 bg-[#1A1A1A] border border-[#333] text-white rounded hover:bg-[#222]">
                          In
                        </button>
                        <button className="text-xs px-2 py-1 bg-[#1A1A1A] border border-[#333] text-white rounded hover:bg-[#222]">
                          Out
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
