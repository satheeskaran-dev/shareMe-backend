const express = require("express");
const router = express.Router();
const createPost = require("../controllers/postControllers/createPost");
const getAllPost = require("../controllers/postControllers/getAllPost");
const getPostsByUser = require("../controllers/postControllers/getPostsByUser");
const deletePost = require("../controllers/postControllers/deletePost");
const likePost = require("../controllers/postControllers/likePost");

router.post("/create-post", createPost);
router.post("/like-post", likePost);
router.get("/", getAllPost);
router.get("/:id", getPostsByUser);
router.delete("/", deletePost);

module.exports = router;
