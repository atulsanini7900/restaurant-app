import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";

export async function GET() {
  const db = mongoose.connect(connectionStr); /// ,{useNewUrlParser:true}
  const data = await restaurantSchema.find();

  return NextResponse.json({ mydata: data });
}

export async function POST(req) {
  const payload = await req.json();
  let result;
  let success = false;
  await mongoose.connect(connectionStr);

  if (payload.login) {
    // use it for login
    result = await restaurantSchema.findOne({
      email: payload.email,
      password: payload.password,
    });
    if (result) {
      success = true;
    }
  } else {
    // use it for signup
    const restaurant = new restaurantSchema(payload);
    result = await restaurant.save();
    if (result) {
      success = true;
    }
  }
  return NextResponse.json({ result, success });
}
