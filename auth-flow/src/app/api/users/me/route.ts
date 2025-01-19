import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import user from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import next from "next";

connect();

export async function GET() {
  try {
    const userID = await getDataFromToken(request);
    const user = await UserActivation.findOne({ _id: userID }).select(
      "-password "
    );
    return NextResponse.json({
      message: "User Found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
