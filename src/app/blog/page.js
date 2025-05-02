import BlogOverview from "@/componets/blog-overview";

const fetchListOfBlogs = async () => {
  try {
    const apiRes = await fetch("http://localhost:3000/api/get-blogs", {
      method: "GET",
      cache: "no-store",
    });
    const result = await apiRes.json();
    return result?.data;
  } catch (error) {
    throw new Error(error);
  }
};

const Blog = async () => {
  const blogList = await fetchListOfBlogs();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 gap-10">
      <BlogOverview blogList={blogList} />
    </div>
  );
};

export default Blog;
