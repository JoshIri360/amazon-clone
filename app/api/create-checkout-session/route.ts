import { Request, Response } from "express";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (req: Request, res: Response) => {
  console.log(await req.json());

  const transformedItems = req.body.map((item: any) => ({
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
  }));

  const session = await stripe.checkout.sessions.create({
    
  })
};
