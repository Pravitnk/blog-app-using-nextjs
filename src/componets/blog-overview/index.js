"use client";

import { useEffect, useState } from "react";
import AddNewBlog from "../add-new-blog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

const initialBlogData = {
  title: "",
  description: "",
};
const BlogOverview = ({ blogList }) => {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [blogData, setBlogData] = useState(initialBlogData);
  const [loading, setLoading] = useState(false);
  const [currentEditBlogId, setCurrentEditBlogId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  //adding blog function

  const handleSaveBlogData = async () => {
    try {
      setLoading(true);
      const apiRes =
        currentEditBlogId !== null
          ? await fetch(`api/update-blog?id=${currentEditBlogId}`, {
              method: "PUT",
              body: JSON.stringify(blogData),
            })
          : await fetch("/api/add-blog", {
              method: "POST",
              body: JSON.stringify(blogData),
            });
      const result = await apiRes.json();
      if (result?.success) {
        setBlogData(blogData);
        setOpenBlogDialog(false);
        setLoading(false);
        setCurrentEditBlogId(null);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setBlogData(initialBlogData);
    }
  };

  //delete blog function
  const handleDeleteBlogById = async (currentId) => {
    try {
      const apiRes = await fetch(`/api/delete-blog?id=${currentId}`, {
        method: "DELETE",
      });
      const result = await apiRes.json();

      if (result.success) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //edit blog function
  const handleEditBlogById = async (getCurrentBlog) => {
    try {
      setCurrentEditBlogId(getCurrentBlog?._id);
      setBlogData({
        title: getCurrentBlog?.title,
        description: getCurrentBlog?.description,
      });
      setOpenBlogDialog(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        blogData={blogData}
        setBlogData={setBlogData}
        handleSaveBlogData={handleSaveBlogData}
        loading={loading}
        currentEditBlogId={currentEditBlogId}
        setCurrentEditBlogId={setCurrentEditBlogId}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-6">
        {blogList && blogList.length > 0 ? (
          blogList?.map((blogItem) => (
            <Card
              key={blogItem._id}
              className="p-5 bg-white dark:bg-zinc-900 shadow-md rounded-2xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <CardContent>
                <CardTitle className="mb-5 text-xl text-center font-semibold text-zinc-800 dark:text-zinc-100">
                  {blogItem?.title}
                </CardTitle>
                <CardDescription className="text-lg text-zinc-600 text-center dark:text-zinc-300">
                  {blogItem?.description}
                </CardDescription>
                <CardFooter>
                  <div className="flex items-center mt-8 gap-8">
                    <Button
                      onClick={() => handleEditBlogById(blogItem)}
                      className="cursor-pointer"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteBlogById(blogItem._id)}
                      className="cursor-pointer"
                    >
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </CardContent>
            </Card>
          ))
        ) : (
          <Label className="text-xl text-center">
            No Blog is Available please add one
          </Label>
        )}
      </div>
    </div>
  );
};

export default BlogOverview;
