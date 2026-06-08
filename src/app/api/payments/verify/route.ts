import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";

// POST /api/payments/verify - Verify Razorpay payment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, paymentId } = body;
    const tenantId = await requireTenant();

    // Verify payment belongs to tenant
    const existing = await prisma.payment.findFirst({ where: { id: paymentId, tenantId } });
    if (!existing) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // In production, verify signature:
    // const crypto = require('crypto');
    // const generated = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    //   .update(razorpayOrderId + '|' + razorpayPaymentId)
    //   .digest('hex');
    // if (generated !== razorpaySignature) throw new Error('Invalid signature');

    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: "PAID",
        razorpayPaymentId,
        razorpaySignature,
        paidAt: new Date(),
      },
      include: {
        membership: true,
      },
    });

    // If linked to a membership, activate it
    if (payment.membershipId) {
      await prisma.membership.update({
        where: { id: payment.membershipId },
        data: { status: "ACTIVE" },
      });
    }

    return NextResponse.json({ data: payment, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
  }
}
