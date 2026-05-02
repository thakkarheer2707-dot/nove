import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import supabase from "@/lib/supabase";
import { getSession, decrypt } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, orderDetails, integrityToken } = await request.json();

    if (!email || !orderDetails) {
      return NextResponse.json({ error: "Email and order details are required" }, { status: 400 });
    }

    // 1. Security Check: Session or Integrity Token
    const session = await getSession();
    const isOnlinePayment = orderDetails.paymentMethod === "online" || orderDetails.paymentMethod === "Online";

    if (isOnlinePayment) {
      if (!integrityToken) {
        return NextResponse.json({ error: "Payment integrity token missing. Checkout failed." }, { status: 403 });
      }
      try {
        const payload = await decrypt(integrityToken);
        if (payload.type !== "payment_verification" || !payload.verified) {
          throw new Error("Invalid integrity token");
        }
      } catch (err) {
        return NextResponse.json({ error: "Payment verification failed. Security breach detected." }, { status: 403 });
      }
    } else {
      // For COD, require a logged-in session or at least valid email
      if (!session && !email.includes("@")) {
         return NextResponse.json({ error: "Authentication required for order placement." }, { status: 401 });
      }
    }

    // 2. Save to Supabase
    const orderId = `NOVE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        id: orderId,
        customer_email: email,
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        total: orderDetails.total,
        items: orderDetails.items,
        shipping_address: orderDetails.shippingAddress,
        status: "Pending",
        payment_method: isOnlinePayment ? "Online" : "Cash on Delivery",
        user_id: session?.user?.id || null, // Associate with user if logged in
      })
      .select()
      .single();

    if (error || !order) {
      console.error("Supabase order insert error:", error);
      return NextResponse.json({ error: "Failed to save order. Please contact support." }, { status: 500 });
    }

    // 3. Send Admin Notification Email
    try {
      if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        const itemsHtml = (order.items as any[])
          .map(
            (item) =>
              `<li>${item.name} (${item.color}) - Qty: ${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}</li>`
          )
          .join("");

        await transporter.sendMail({
          from: `"NOVE Sales" <${process.env.SMTP_EMAIL}>`,
          to: process.env.SMTP_EMAIL,
          subject: `New Order Received: ${order.id}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2>New Order: ${order.id}</h2>
              <p>Customer: ${email}</p>
              <p>Total: ₹${(order.total as number).toLocaleString()}</p>
              <p>Payment: ${order.payment_method}</p>
              <h3>Items:</h3>
              <ul>${itemsHtml}</ul>
            </div>
          `,
        });
      }
    } catch (mailError) {
      console.error("[MAIL] Failed to notify admin:", mailError);
    }

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error("Order confirmation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

