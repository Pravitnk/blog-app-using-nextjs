import connectToDB from "@/database";
import blog from "@/models/blog";
import { NextResponse } from "next/server"; // Make sure this is imported

const GET = async () => {
  try {
    await connectToDB();
    const extractAllBlogsFromDb = await blog.find({});

    if (extractAllBlogsFromDb) {
      return NextResponse.json({
        success: true,
        data: extractAllBlogsFromDb,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.error("GET /api/blogs error:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export { GET };
