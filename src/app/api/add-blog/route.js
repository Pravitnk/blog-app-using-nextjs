const { default: connectToDB } = require("@/database");
const { default: blog } = require("@/models/blog");
const Joi = require("joi");
const { NextResponse } = require("next/server");

const AddNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const POST = async (req) => {
  try {
    await connectToDB();

    const extractBlogData = await req.json();
    const { title, description } = extractBlogData;

    const { error } = AddNewBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const newlyCreatedBlogData = await blog.create(extractBlogData);
    if (newlyCreatedBlogData) {
      return NextResponse.json({
        success: true,
        message: "Blog added successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong ! Please try again",
      });
    }
  } catch (error) {
    console.log(error);
    console.log("error :", error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
};

export { POST };
