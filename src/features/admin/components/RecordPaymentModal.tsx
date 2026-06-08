'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, IndianRupee, FileText, Loader2, Tag } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { z } from 'zod';

const recordPaymentSchema = z.object({
  memberId: z.string().min(1, "Member is required"),
  amount: z.number().positive("Amount must be positive"),
  method: z.enum(["CASH", "UPI", "CARD", "NET_BANKING", "RAZORPAY"]),
  description: z.string().optional(),
  couponCode: z.string().optional(),
});

type RecordPaymentInput = z.infer<typeof recordPaymentSchema>;

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecordPaymentModal({ isOpen, onClose }: RecordPaymentModalProps) {
  const queryClient = useQueryClient();

  const { data: membersData } = useQuery({
    queryKey: ['members-list'],
    queryFn: async () => {
      const res = await fetch('/api/members?limit=100'); // Fetch enough for a dropdown
      if (!res.ok) throw new Error('Failed to fetch members');
      return res.json();
    },
    enabled: isOpen,
  });

  const members = membersData?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecordPaymentInput>({
    resolver: zodResolver(recordPaymentSchema),
    defaultValues: {
      method: 'CASH',
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: RecordPaymentInput) => {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to record payment');
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success('Payment recorded successfully');
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      reset();
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: RecordPaymentInput) => {
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
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#10B981] to-transparent" />
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Record Payment</h3>
                  <p className="text-sm text-[#737373]">Manually record a transaction</p>
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
                  <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Select Member</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]" size={18} />
                    <select
                      {...register('memberId')}
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#10B981] focus:bg-white/[0.05] transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select a member...</option>
                      {members.map((m: any) => (
                        <option key={m.id} value={m.id}>{m.user.name} ({m.user.phone})</option>
                      ))}
                    </select>
                  </div>
                  {errors.memberId && <p className="text-xs text-[#DC2626] ml-1">{errors.memberId.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Amount (₹)</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]" size={18} />
                      <input
                        {...register('amount', { valueAsNumber: true })}
                        type="number"
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#10B981] focus:bg-white/[0.05] transition-all"
                        placeholder="0.00"
                      />
                    </div>
                    {errors.amount && <p className="text-xs text-[#DC2626] ml-1">{errors.amount.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Payment Method</label>
                    <select
                      {...register('method')}
                      className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#10B981] focus:bg-white/[0.05] transition-all appearance-none cursor-pointer"
                    >
                      <option value="CASH">Cash</option>
                      <option value="UPI">UPI</option>
                      <option value="CARD">Card</option>
                      <option value="NET_BANKING">Net Banking</option>
                    </select>
                    {errors.method && <p className="text-xs text-[#DC2626] ml-1">{errors.method.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Coupon Code (Optional)</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]" size={18} />
                    <input
                      {...register('couponCode')}
                      type="text"
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#10B981] focus:bg-white/[0.05] transition-all uppercase"
                      placeholder="e.g. FESTIVAL20"
                    />
                  </div>
                  {errors.couponCode && <p className="text-xs text-[#DC2626] ml-1">{errors.couponCode.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Description</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-3 text-[#737373]" size={18} />
                    <textarea
                      {...register('description')}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#10B981] focus:bg-white/[0.05] transition-all resize-none"
                      placeholder="Notes regarding this payment..."
                      rows={3}
                    />
                  </div>
                  {errors.description && <p className="text-xs text-[#DC2626] ml-1">{errors.description.message}</p>}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {mutation.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Record Payment'
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
