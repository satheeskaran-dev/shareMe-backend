const express = require("express");
const router = express.Router();
const { createPost, getAllPost } = require("../controllers/postController");

router.post("/create-post", createPost);
router.get("/", getAllPost);

module.exports = router;
