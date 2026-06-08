'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Lock, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

const addMemberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
});

type AddMemberInput = z.infer<typeof addMemberSchema>;

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddMemberModal({ isOpen, onClose }: AddMemberModalProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddMemberInput>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      password: 'vikings@123', // Default password
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: AddMemberInput) => {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create member');
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success('Member created successfully');
      queryClient.invalidateQueries({ queryKey: ['members'] });
      reset();
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: AddMemberInput) => {
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
                  <h3 className="text-2xl font-bold text-white tracking-tight">Add New Member</h3>
                  <p className="text-sm text-[#737373]">Create a new warrior profile</p>
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
                  <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]" size={18} />
                    <input
                      {...register('name')}
                      type="text"
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#DC2626] focus:bg-white/[0.05] transition-all"
                      placeholder="Enter name"
                    />
                  </div>
                  {errors.name && <p className="text-xs text-[#DC2626] ml-1">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]" size={18} />
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#DC2626] focus:bg-white/[0.05] transition-all"
                      placeholder="Enter email"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-[#DC2626] ml-1">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]" size={18} />
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#DC2626] focus:bg-white/[0.05] transition-all"
                      placeholder="Enter phone number"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-[#DC2626] ml-1">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Initial Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]" size={18} />
                    <input
                      {...register('password')}
                      type="text"
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#DC2626] focus:bg-white/[0.05] transition-all"
                      placeholder="Set password"
                    />
                  </div>
                  {errors.password && <p className="text-xs text-[#DC2626] ml-1">{errors.password.message}</p>}
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
                      'Create Member Profile'
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
