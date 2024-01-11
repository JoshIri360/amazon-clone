import { buffer } from "micro";
import admin from "firebase-admin";
import { timeStamp } from "console";

const serviceAccount = require("../../../permissions.json");

const _app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

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
  console.log("Webhook called");
  const buf = await buffer(req);
  const payload = buf.toString();
  const sig = req.headers["stripe-signature"];

  let event;

  // Verify that the EVENT posted came from stripe
  try {
    console.log("VERIFYING EVENT");
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    console.log("EVENT VERIFIED");
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
    console.log("SESSION", session);

    // Fulfill the order
    return fulfillOrder(session)
      .then(() => {
        return NextResponse.json(session, {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
      .catch((error) => {
        return NextResponse.json(`Webhook error: ${error.message}`, {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        });
      });
  }

  const session = event.data.object;
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
