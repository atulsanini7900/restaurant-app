import { connectionStr } from "@/app/lib/db";
import { deliveryPartnersSchema } from "@/app/lib/deliverypartners";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(requet) {
  const payload = await requet.json();
  let success = false;
  let result;
  await mongoose.connect(connectionStr);

  const user = new deliveryPartnersSchema(payload);
  result = await user.save();
  if (result) {
    success = true;
  }

  return NextResponse.json({ result, success });
}
