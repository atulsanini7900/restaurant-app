import { connectionStr } from "@/app/lib/db";
import { userSchema } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(requet) {
  const payload = await requet.json();
  let success = false;
  let result;
  await mongoose.connect(connectionStr);
  if (payload.login) {
    result = await userSchema.findOne({
      email: payload.email,
      password: payload.password,
    });
    if (result) {
      success = true;
    }
  } else {
    const user = new userSchema(payload);
    result = await user.save();
    if (result) {
      success = true;
    }
  }

  return NextResponse.json({ result, success });
}
