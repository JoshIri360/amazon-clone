import { NextResponse, NextRequest } from "next/server";
import admin from "firebase-admin";
import { db } from "../../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { time, timeStamp } from "console";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const serviceAccount = require("../../../permissions.json");

const fulfillOrder = async (session, timeCreated) => {
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
    const items = [];
    let total = 0;

    for (const item of line_items.data) {
      const productID = item.price.product;
      const product = await stripe.products.retrieve(productID);
      let productImages = [];
      if (product.images.length > 0) {
        productImages = product.images;
      }
      total += item.amount_total / 100;

      items.push({
        id: item.id,
        amount_total: item.amount_total / 100,
        description: item.description,
        quantity: item.quantity,
        images: productImages,
      });
    }

    const NewOrderDoc = await addDoc(userDocRef, {
      items,
      total,
      timeStamp: timeCreated,
    });

    return NewOrderDoc.id;
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

    // Fulfill the order
    return fulfillOrder(session, event.created)
      .then((id) => {
        return NextResponse.json(
          { session, id },
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
