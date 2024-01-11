import { NextResponse, NextRequest } from "next/server";
import admin from "firebase-admin";
import { db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";

const serviceAccount = require("../../../permissions.json");

const _app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const fulfillOrder = async (session) => {
  console.log("Fulfilling order", session);

  const docRef = await addDoc(collection(db, "users"), {
    id: session.id,
    email: session.customer_details.email,
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

  return docRef;
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
