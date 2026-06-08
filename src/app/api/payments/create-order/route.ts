import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";

// POST /api/payments/create-order - Create Razorpay order
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, memberId, membershipId, description } = body;
    const tenantId = await requireTenant();

    // In production, use Razorpay SDK:
    // const Razorpay = require('razorpay');
    // const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
    // const order = await razorpay.orders.create({ amount: amount * 100, currency: 'INR', receipt: `receipt_${Date.now()}` });

    // Mock Razorpay order for development
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    const payment = await prisma.payment.create({
      data: {
        memberId,
        membershipId: membershipId || null,
        tenantId,
        amount,
        totalAmount: amount,
        method: "RAZORPAY",
        status: "PENDING",
        description: description || "Membership Payment",
        razorpayOrderId: orderId,
        invoiceNumber: `VGM-${Date.now().toString(36).toUpperCase()}`,
      },
    });

    return NextResponse.json({
      data: {
        orderId,
        amount: amount * 100,
        currency: "INR",
        paymentId: payment.id,
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
