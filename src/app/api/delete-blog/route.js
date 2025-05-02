const { default: connectToDB } = require("@/database");
const { default: blog } = require("@/models/blog");
const { NextResponse } = require("next/server");

const DELETE = async (req) => {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const getCurrentBlogId = searchParams.get("id");

    if (!getCurrentBlogId) {
      return NextResponse.json({
        success: false,
        message: "Blog ID is required",
      });
    } else {
      const deleteCurrentBlogById = await blog.findByIdAndDelete(
        getCurrentBlogId
      );
      if (deleteCurrentBlogById) {
        return NextResponse.json({
          success: true,
          message: "Blog is deleted successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Something went wrong please try again later.",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong please try again later.",
    });
  }
};

export { DELETE };
