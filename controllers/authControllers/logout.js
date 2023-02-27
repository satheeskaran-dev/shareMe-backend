const asyncHandler = require("express-async-handler");

const logOut = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.sendStatus(204);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.json({ message: "cookie cleared" });
});

module.exports = logOut;
