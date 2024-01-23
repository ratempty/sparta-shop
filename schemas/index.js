import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_name = process.env.DB_name;
const DB_link = process.env.DB_link;

const connect = () => {
  mongoose
    .connect(`mongodb+srv://${DB_link}`, {
      dbName: `${DB_name}`,
    })
    .then(() => console.log("MongoDB 연결에 성공하였습니다."))
    .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB 연결 에러", err);
});

export default connect;
