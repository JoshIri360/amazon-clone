import { buffer } from "micro";
import { apps, initializeApp, credential, app } from "firebase-admin";

const serviceAccount = require("../../../permissions.json");

const _app = !apps.length
  ? initializeApp({
      credential: credential.cert(serviceAccount),
    })
  : app;

// Establish connection to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export const POST = async (req, res) => {
  const buf = await buffer(req);
  const payload = buf.toString();
  const sig = req.headers["stripe-signature"];

  let event;

  // Verify that the EVENT posted came from stripe
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (error) {
    console.log("ERROR", error.message);
    return NextResponse.json(`Webhook error: ${error.message}`, {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Fulfill the order
    return fulfillOrder(session)
      .then(() => {
        res.status(200);
      })
      .catch((error) => {
        res.status(400).send(`Webhook Error: ${error.message}`);
      });
  }

  const session = event.data.object;
};
