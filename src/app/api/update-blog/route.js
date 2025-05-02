//update

import connectToDB from "@/database";
import blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const editBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const PUT = async (req) => {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const getCurrentBlogId = searchParams.get("id");

    if (!getCurrentBlogId) {
      return NextResponse.json({
        success: false,
        message: "Blog ID is not found...",
      });
    }

    const { title, description } = await req.json();

    const { error } = editBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const updateBlogById = await blog.findOneAndUpdate(
      { _id: getCurrentBlogId },
      { title, description },
      { new: true }
    );
    if (!updateBlogById) {
      return NextResponse.json({
        success: false,
        message: "Something went wrong Please try again later...",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Blog updated successfullyr...",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong Please try again later...",
    });
  }
};

export { PUT };
