import { connectionStr } from "@/app/lib/db";
import { ordersSchema } from "@/app/lib/ordersModel";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  let success = false;
  await mongoose.connect(connectionStr);
  const orderObj = new ordersSchema(payload);
  const result = await orderObj.save();
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}

export async function GET(request) {
  const userId = request.nextUrl.searchParams.get("id");
  let success = false;
  await mongoose.connect(connectionStr);
  let results = await ordersSchema.find({ user_Id: userId });
  if (results && results.length > 0) {
    let restoData = await Promise.all(
      results.map(async (item) => {
        let restoInfo = {};
        restoInfo.data = await restaurantSchema.findOne({ _id: item.resto_id });
        restoInfo.amount = item.amount;
        restoInfo.status = item.status;
        return restoInfo;
      })
    );
    results = restoData;
    success = true;
  }
  return NextResponse.json({ results, success });
}
