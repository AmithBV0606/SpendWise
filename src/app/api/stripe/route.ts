import { prisma } from "@/lib/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(request: Request) {
  const body = await request.text();

  //   Verify that the webhook is from stripe(Security)
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      request.headers.get("stripe-signature")!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error(`Webhook signature verification failed. ${error.message}`);
    return Response.json({ received: false }, { status: 400 });
  }

  // Fulfill order
  switch (event.type) {
    case "checkout.session.completed":
      await prisma.membership.create({
        data: {
          userId: event.data.object.client_reference_id!,
          status: "active",
        },
      });
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  //   Return 200 Ok : If we were successfully able to create membership in our DB, we need to notify that to the stripe, or else stripe webhook will keep on sending the request to our API endpoint.
  return Response.json({ received: true }, { status: 200 });
}