import { Request, Response } from "express";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type Item = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
};

// Include 'json' property on the request object
declare global {
  namespace Express {
    interface Request {
      json: any;
    }
  }
}

export const POST = async (req: Request, res: Response) => {
  try {
    const { cart, email } = await req.json();

    const transformedItems = cart.map((item: Item) => {
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

    res.status(201).json({ id: session.id });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
