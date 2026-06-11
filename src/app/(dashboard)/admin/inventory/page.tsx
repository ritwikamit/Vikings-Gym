"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Search, Filter, Package, AlertTriangle, Plus, Pencil, Trash2 } from "lucide-react";
import { AddItemModal } from "@/features/admin/components/AddItemModal";

export default function InventoryPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: inventoryData, isLoading } = useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      const res = await fetch('/api/inventory');
      if (!res.ok) throw new Error('Failed to fetch inventory');
      return res.json();
    },
  });

  const items = inventoryData?.data || [];
  
  const filteredItems = items.filter((item: any) => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = items.filter((item: any) => item.quantity <= item.minQuantity);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Inventory</h1>
          <p className="text-sm text-slate-400">Manage supplements, merchandise, and equipment.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#C62828] hover:bg-[#A32020] text-white rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      <AddItemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-full">
              <Package className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Items</p>
              <h3 className="text-2xl font-bold text-white">{items.length}</h3>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-6 border border-transparent hover:border-sky-500/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-sky-500/10 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-sky-500" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Low Stock Alerts</p>
              <h3 className="text-2xl font-bold text-white">{lowStockItems.length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[slate-800] border border-[slate-700] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[slate-800] border border-[slate-700] rounded-lg text-sm text-white hover:bg-[slate-800]">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-[slate-400] text-sm">Loading inventory...</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Supplier</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-500">No items found.</td>
                  </tr>
                ) : (
                  filteredItems.map((item: any) => (
                    <tr key={item.id}>
                      <td className="text-white font-medium">{item.name}</td>
                      <td>
                        <span className="px-2 py-1 rounded bg-white/5 text-xs text-gray-300 font-medium">
                          {item.category}
                        </span>
                      </td>
                      <td className="text-white">{item.price ? formatCurrency(item.price) : '-'}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${item.quantity <= item.minQuantity ? 'text-sky-500' : 'text-white'}`}>
                            {item.quantity}
                          </span>
                          {item.quantity <= item.minQuantity && (
                            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" title="Low stock" />
                          )}
                        </div>
                      </td>
                      <td className="text-slate-400 text-sm">{item.supplier || '-'}</td>
                      <td className="text-slate-400 text-sm">{formatDate(item.updatedAt)}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded-lg text-[slate-400] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-colors" title="Edit">
                            <Pencil size={15} />
                          </button>
                          <button className="p-1.5 rounded-lg text-[slate-400] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors" title="Delete">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
