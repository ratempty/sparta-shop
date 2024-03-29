import express from "express";
import connect from "./schemas/index.js";
import productsRouter from "./routes/products.router.js";

const app = express();
const PORT = 3000;

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ messege: "api 통신 ok" });
});

app.use("/api", [router, productsRouter]);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸습니다!");
});
