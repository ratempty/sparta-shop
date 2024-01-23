import express from "express";
import Product from "../schemas/products.schema.js";

const router = express.Router();

// 상품 등록 api
router.post("/products", async (req, res) => {
  try {
    const { title, content, author, password } = req.body;
    const newItem = new Product({ title, content, author, password });

    await newItem.save();

    return res.status(201).json({ message: "새로운 상품을 등록하였습니다!" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
  }
});

// 상품 목록 조회 api

router.get("/products", async (req, res) => {
  const items = await Product.find().sort("-createdAt").exec();

  return res.status(200).json({ items });
});

// 상품 상세 조회 api
// ==================없는 아이템 아이디 조회시 오류?
router.get("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const currItem = await Product.findById(productId).exec();
    if (!currItem) {
      return res.status(404).json({ errorMessage: "해당 상품이 없습니다!" });
    } else {
      return res.status(200).json({ currItem });
    }
  } catch (error) {
    return res.status(404).json({ errorMessage: "해당 상품이 없습니다!" });
  }
});

// 상품 정보 수정 api

router.put("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, content, password, status } = req.body;

    if (!title || !content || !password || !status) {
      return res
        .status(404)
        .json({ errorMessage: "상품 조회를 실패했습니다!" });
    }
    
    const targetItem = await Product.findById(productId).exec();

    if (targetItem.password === password) {
      targetItem.title = title;
      targetItem.content = content;
      targetItem.status = status;
    } else {
      return res.status(401).json({ errorMessage: "수정할 권한이 없습니다!" });
    }

    await targetItem.save();

    return res.status(200).json({ message: "상품 정보 수정 완료!" });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ errorMessage: "데이터형식이 올바르지 않습니다!" });
  }
});

// 상품 정보 삭제 api

router.delete("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { password } = req.body;
    const currItem = await Product.findById(productId).exec();

    if (currItem.password == password) {
      await Product.deleteOne({ _id: productId });
      return res.status(200).json({ message: "상품을 삭제했습니다!" });
    } else {
      return res.status(401).json({ message: "삭제할 권한이 없습니다!" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ errorMessage: "데이터 형식이 올바르지 않습니다!" });
  }
});

export default router;
