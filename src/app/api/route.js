const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { NextResponse } from "next/server";

// export async function POST(req) {

//   return NextResponse.json({clientSecret: "hi"})
// }

export async function POST(req) {
  console.log(req.body);
  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",

    payment_method_types: ["card"],

    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1O8czxSHBIS48Dl7Rk1kp096",
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: `http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  return NextResponse.json({ clientSecret: session.client_secret });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");
  console.log(session_id);

  // return NextResponse.json({clientSecret: "hi"})

  const session = await stripe.checkout.sessions.retrieve(session_id);

  //   // res.send({
  //   //   status: session.status,
  //   //   customer_email: session.customer_details.email,
  //   // });

  let product=await session;
  console.log(product.status,product.customer_details.email)
// send the product to frontend

 return NextResponse.json({ product});

}
