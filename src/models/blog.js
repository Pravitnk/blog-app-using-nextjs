import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
