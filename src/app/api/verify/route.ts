import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { encrypt } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment identifiers" }, { status: 400 });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const secret = process.env.RAZORPAY_KEY_SECRET || 'mock_secret';
    const expectedSign = crypto
      .createHmac("sha256", secret)
      .update(sign.toString())
      .digest("hex");

    const isVerified = razorpay_signature === expectedSign;
    const isMock = secret === 'mock_secret';

    if (isVerified || isMock) {
      // Create a short-lived integrity token that the client must pass to /api/orders/confirm
      const integrityToken = await encrypt({
        razorpay_order_id,
        razorpay_payment_id,
        verified: true,
        type: "payment_verification",
        exp: Math.floor(Date.now() / 1000) + 300 // 5 minutes
      });

      return NextResponse.json({ 
        success: true, 
        message: isMock ? "Payment verified (MOCK)" : "Payment verified successfully",
        integrityToken
      });
    }

    return NextResponse.json({ success: false, message: "Invalid signature sent!" }, { status: 400 });
  } catch (error: any) {
    console.error("[PAYMENT VERIFY] Error:", error);
    return NextResponse.json({ error: "Internal server error during verification" }, { status: 500 });
  }
}

