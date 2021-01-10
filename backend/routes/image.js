const Router = require("express-promise-router");

const router = Router();

router.post("/", (req, res) => {
  const { imgString } = req.body; // data:image/jpeg;base64, ...
  console.log(imgString);

  let split;

  if (imgString && typeof imgString === "string") {
    split = imgString.split(new RegExp(",|;"));
  } else {
    res.status(400).json({ message: "Bad request" });
  }

  console.log(split);

  // send image to google for processing

  res.json({ message: "HI" });
});

module.exports = router;