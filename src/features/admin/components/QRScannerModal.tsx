'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QRScannerModal({ isOpen, onClose }: QRScannerModalProps) {
  const queryClient = useQueryClient();
  const [scanStatus, setScanStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [scanMessage, setScanMessage] = useState('');
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const mutation = useMutation({
    mutationFn: async (memberId: string) => {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId, method: 'QR_CODE' }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to record attendance');
      }
      return res.json();
    },
    onSuccess: (data) => {
      setScanStatus('success');
      setScanMessage(`Check-in successful for ${data.data.member.user.name}`);
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      
      // Reset scanner after 3 seconds
      setTimeout(() => {
        if (isOpen) {
          setScanStatus('idle');
          setScanMessage('');
        }
      }, 3000);
    },
    onError: (error: any) => {
      setScanStatus('error');
      setScanMessage(error.message);
      toast.error(error.message);
      
      // Reset scanner after 3 seconds
      setTimeout(() => {
        if (isOpen) {
          setScanStatus('idle');
          setScanMessage('');
        }
      }, 3000);
    },
  });

  useEffect(() => {
    if (!isOpen) {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
      setScanStatus('idle');
      setScanMessage('');
      return;
    }

    // Initialize scanner only when modal is open and in idle state
    if (isOpen && scanStatus === 'idle') {
      const initScanner = () => {
        const scanner = new Html5QrcodeScanner(
          "qr-reader",
          { 
            fps: 10, 
            qrbox: { width: 250, height: 250 },
            supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
          },
          false
        );
        
        scannerRef.current = scanner;

        scanner.render(
          (decodedText) => {
            // Stop scanning temporarily
            if (scanStatus === 'idle') {
              setScanStatus('loading');
              mutation.mutate(decodedText);
            }
          },
          (error) => {
            // Ignore normal scanning errors
          }
        );
      };

      // Add a small delay to ensure DOM element exists
      const timer = setTimeout(initScanner, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, scanStatus]);

  const handleClose = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
      scannerRef.current = null;
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DC2626] to-transparent" />
            
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0EA5E9]/10 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-[#0EA5E9]" />
                </div>
                <div>
                  <h3 className="font-bold text-white tracking-tight">QR Scanner</h3>
                  <p className="text-xs text-[#737373]">Scan member code to check in</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-xl bg-white/5 text-[#737373] hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col items-center justify-center min-h-[400px] relative">
              {scanStatus === 'idle' && (
                <div className="w-full relative rounded-2xl overflow-hidden border-2 border-dashed border-[#0EA5E9]/30">
                  <div id="qr-reader" className="w-full" />
                </div>
              )}

              {scanStatus === 'loading' && (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 border-4 border-[#0EA5E9] border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-white font-medium">Verifying member...</p>
                </div>
              )}

              {scanStatus === 'success' && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Check-in Successful!</h4>
                  <p className="text-gray-400">{scanMessage}</p>
                </motion.div>
              )}

              {scanStatus === 'error' && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Check-in Failed</h4>
                  <p className="text-gray-400">{scanMessage}</p>
                  <button 
                    onClick={() => { setScanStatus('idle'); setScanMessage(''); }}
                    className="mt-6 px-6 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
            </div>
            
            {/* Provide a custom styling block for the html5-qrcode elements */}
            <style jsx global>{`
              #qr-reader {
                border: none !important;
              }
              #qr-reader__scan_region {
                min-height: 300px;
                background: #111;
              }
              #qr-reader__dashboard_section_csr span {
                color: #A3A3A3 !important;
              }
              #qr-reader button {
                background-color: #1A1A1A;
                color: white;
                border: 1px solid #333;
                padding: 8px 16px;
                border-radius: 8px;
                margin-top: 10px;
                cursor: pointer;
              }
              #qr-reader select {
                background-color: #1A1A1A;
                color: white;
                border: 1px solid #333;
                padding: 8px;
                border-radius: 8px;
                margin-bottom: 10px;
              }
              #qr-reader__dashboard_section_swaplink {
                color: #DC2626 !important;
                text-decoration: none;
                margin-top: 10px;
                display: block;
              }
            `}</style>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
