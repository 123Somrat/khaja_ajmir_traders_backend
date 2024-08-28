import mongoose from "mongoose";


let dbConnetionsUrl = process.env.DBCONNECTION_URL as string;
dbConnetionsUrl = dbConnetionsUrl.replace(
  "<username>",
  process.env.DB_USERNAME as string
);
dbConnetionsUrl = dbConnetionsUrl.replace(
  "<password>",
  process.env.DB_PASSWORD as string
);
dbConnetionsUrl = `${dbConnetionsUrl}/${process.env.DB_NAME}?${process.env.DB_QUARIRS}`;

const connectDb = async () => {
  try {
    await mongoose.connect(dbConnetionsUrl);
    console.log("succesfully connected with db");
  } catch (err) {
    console.log(err);
  }
};

export default connectDb;
