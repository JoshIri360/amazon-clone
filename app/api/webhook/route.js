import { buffer } from "micro";
import { apps, initializeApp, credential, app } from "firebase-admin";
import { timeStamp } from "console";

const serviceAccount = require("../../../permissions.json");

const _app = !apps.length
  ? initializeApp({
      credential: credential.cert(serviceAccount),
    })
  : app;

// Establish connection to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  console.log("Fulfilling order", session);
  return _app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      name: session.metadata.name,
      total: session.amount_total / 100,
      items: session.metadata.items,
      images: JSON.parse(session.metadata.images),
      timeStamp: timeStamp,
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} had been added to the DB`);
    })
    .catch((err) => {
      console.log(`ERROR: ${err}`);
    });
};

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
