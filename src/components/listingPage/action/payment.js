"use server";
import { getCollection } from "@/lib/db.connect";
import Stripe from "stripe";

const stripe = new Stripe(process.env.DB_Stripe_Key);

export async function getTheIntent(amount) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    // ✅ just return (no res.send here)
    return { clientSecret: paymentIntent.client_secret };
  } catch (err) {
    console.error("Error creating payment intent:", err);
    return { error: err.message };
  }
}



export async function saveThePaymentHistory(data) {
    
    console.log("Payment data form paymenjs page ",data);
       const { paymentCollection } = await getCollection() ;
       const res=await paymentCollection.insertOne(data);
       return res;
}

export async function isBooked(email,id) {

       const { paymentCollection } = await getCollection() ;
       const data=await paymentCollection.findOne({payment_useremail:email,propertiesId:id});

    return (!!data);

}