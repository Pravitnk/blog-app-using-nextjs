import Link from "next/link";

export default function Home() {
  // mongodb+srv://pravitnaik656:blogApp@cluster0.hhrrpbk.mongodb.net/
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 justify-center items-center">
      <div className="container mx-auto flex flex-col justify-center items-center"></div>
      <h1 className="text-4xl text-white font-bold mb-8">
        Browse Our Blog Collection
      </h1>
      <Link
        href={"blog"}
        className="bg-white text-lg font-bold px-4 py-2 rounded-md hover:scale-105 transition-all duration-500"
      >
        Explore Blogs
      </Link>
      <div></div>
    </div>
  );
}
