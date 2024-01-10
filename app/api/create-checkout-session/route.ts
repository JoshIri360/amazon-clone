import { Request, Response } from "express";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (req: Request, res: Response) => {
  try {
    const { cart, email } = await req.json();

    const transformedItems = await Promise.all(
      cart.map(async (item: any) => {
        return {
          description: item.description,
          quantity: item.quantity,
          price_data: {
            currency: "gbp",
            unit_amount: item.price * 100,
            product_data: {
              name: item.title,
              images: [item.image],
            },
          },
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [...transformedItems],
      mode: "payment",
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/checkout`,
    });

    return new Response(JSON.stringify({ id: session.id }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
};
