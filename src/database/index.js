import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://pravitnaik656:blogApp@cluster0.hhrrpbk.mongodb.net/?retryWrites=true&w=majority";

  // mongoose
  //   .connect(connectToDb)
  //   .then(() => console.log("Blog-app database connected successfully"))
  //   .catch((err) => {
  //     console.log("error found as: ", err);
  //   });
  try {
    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "blogApp", // optional but good for clarity
    });
    console.log("Blog-app database connected successfully");
  } catch (err) {
    console.error("Error connecting to the Blog-app database:", err);
  }
};

export default connectToDB;
