import { foodSchema } from "@/app/lib/foodsModel";

const { connectionStr } = require("@/app/lib/db");
const { default: mongoose } = require("mongoose");
const { NextResponse } = require("next/server");

export async function POST(request) {
  const payload = await request.json();
  let success = false;
  await mongoose.connect(connectionStr);
  const food = new foodSchema(payload);
  const result = await food.save();
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
