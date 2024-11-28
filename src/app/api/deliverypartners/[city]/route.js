import { connectionStr } from "@/app/lib/db";
import { deliveryPartnersSchema } from "@/app/lib/deliverypartners";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(params, content) {
  const city = content.params.city;
  let success = false;
  await mongoose.connect(connectionStr);
  let filter = { city: { $regex: new RegExp(city, "i") } };
  const result = await deliveryPartnersSchema.find(filter);
  return NextResponse.json({ result, success });
}
