'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Tag, Hash, FileText, Loader2, User } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryItemSchema, type InventoryItemInput } from '@/lib/validators';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddItemModal({ isOpen, onClose }: AddItemModalProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InventoryItemInput>({
    resolver: zodResolver(inventoryItemSchema),
    defaultValues: {
      category: 'SUPPLEMENT',
      quantity: 0,
      minQuantity: 5,
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: InventoryItemInput) => {
      const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to add item');
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success('Item added successfully');
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      reset();
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: InventoryItemInput) => {
    mutation.mutate(data);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DC2626] to-transparent" />
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Add Inventory Item</h3>
                  <p className="text-sm text-[#737373]">Register new stock</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 text-[#737373] hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Item Name</label>
                  <div className="relative">
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]" size={18} />
                    <input
                      {...register('name')}
                      type="text"
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#DC2626] focus:bg-white/[0.05] transition-all"
                      placeholder="e.g., Whey Protein 2kg"
                    />
                  </div>
                  {errors.name && <p className="text-xs text-[#DC2626] ml-1">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Category</label>
                    <select
                      {...register('category')}
                      className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#DC2626] focus:bg-white/[0.05] transition-all appearance-none cursor-pointer"
                    >
                      <option value="SUPPLEMENT">Supplement</option>
                      <option value="MERCHANDISE">Merchandise</option>
                      <option value="ACCESSORY">Accessory</option>
                      <option value="EQUIPMENT">Equipment</option>
                    </select>
                    {errors.category && <p className="text-xs text-[#DC2626] ml-1">{errors.category.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Price (₹)</label>
                    <div className="relative">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]" size={18} />
                      <input
                        {...register('price', { valueAsNumber: true })}
                        type="number"
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#DC2626] focus:bg-white/[0.05] transition-all"
                        placeholder="0.00"
                      />
                    </div>
                    {errors.price && <p className="text-xs text-[#DC2626] ml-1">{errors.price.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Current Qty</label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]" size={18} />
                      <input
                        {...register('quantity', { valueAsNumber: true })}
                        type="number"
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#DC2626] focus:bg-white/[0.05] transition-all"
                        placeholder="0"
                      />
                    </div>
                    {errors.quantity && <p className="text-xs text-[#DC2626] ml-1">{errors.quantity.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Min Threshold</label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]" size={18} />
                      <input
                        {...register('minQuantity', { valueAsNumber: true })}
                        type="number"
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#DC2626] focus:bg-white/[0.05] transition-all"
                        placeholder="5"
                      />
                    </div>
                    {errors.minQuantity && <p className="text-xs text-[#DC2626] ml-1">{errors.minQuantity.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Supplier</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]" size={18} />
                    <input
                      {...register('supplier')}
                      type="text"
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#DC2626] focus:bg-white/[0.05] transition-all"
                      placeholder="Supplier name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Description</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-3 text-[#737373]" size={18} />
                    <textarea
                      {...register('description')}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#DC2626] focus:bg-white/[0.05] transition-all resize-none"
                      placeholder="Notes about this item..."
                      rows={3}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white font-bold text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-red-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {mutation.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Add Inventory Item'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
