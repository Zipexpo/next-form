import dbConnect from "@/lib/mongodb"; // Connect to mongodb
import { checkAuth } from "@/lib/utils_server";
import Collection from "@/models/Collection"; // Mongoose model
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  try {
    const result = {};
    checkAuth(req,result);
    const {userID} = result;
    if (userID){
      const { label = "Untitled Collection" } = await req.json();

      const newCollection = await Collection.create({
        label,
        user: userId,
      });

      return NextResponse.json({
        success: true,
        collectionId: newCollection._id,
      });
    }
  } catch (error) {
    console.error("Error creating collection:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
