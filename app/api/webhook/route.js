import { NextResponse, NextRequest } from "next/server";
import admin from "firebase-admin";
import { db } from "../../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const serviceAccount = require("../../../permissions.json");

console.log("serviceAccount", serviceAccount);

const _app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// const db = _app.firestore();

const fulfillOrder = async (session) => {
  console.log("Fulfilling order", session);
  const line_items = await stripe.checkout.sessions.listLineItems(
    session.object.id,
    {
      limit: 100,
    }
  );

  const userEmail = session.object.customer_details.email;

  try {
    const userDoc = doc(db, "users", userEmail);
    await setDoc(userDoc, {
      id: session.object.id,
      email: userEmail,
    });

    const userDocRef = collection(userDoc, "orders");
    for (const item of line_items.data) {
      await addDoc(userDocRef, {
        id: item.id,
        amount: item.amount_total / 100,
        description: item.description,
        quantity: item.quantity,
      });
    }

    return userDocRef;
  } catch (error) {
    console.error("Error processing order: ", error);
    throw error; // re-throw the error so it can be handled by the caller
  }
};

export const POST = async (req, res) => {
  let event;

  // Verify that the EVENT posted came from stripe
  try {
    event = await req.json();
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
    const session = event.data;
    console.log("SESSION", session);
    const lineItems = await stripe;
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
};
