import { NextResponse, NextRequest } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (req) => {
  try {
    const { cart, email } = await req.json();

    const transformedItems = cart.map((item) => {
      return {
        quantity: item.quantity,
        price_data: {
          currency: "gbp",
          unit_amount: item.price * 100,
          product_data: {
            name: item.title,
            description: item.description,
            images: [item.image],
          },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [...transformedItems],
      mode: "payment",
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/checkout`,
    });

    const session_url = JSON.stringify({
      sessionUrl: session.url,
    });

    return NextResponse.json(session_url, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
