require("dotenv").config();
const Router = require("express-promise-router");
const projectId = process.env.PROJECT_ID;
const location = process.env.LOCATION;
const modelId = process.env.MODEL_ID;
const { PredictionServiceClient } = require("@google-cloud/automl").v1;
const client = new PredictionServiceClient();
const router = Router();

router.post("/", async (req, res) => {
  const { imgString } = req.body; // data:image/jpeg;base64

  let split;

  if (imgString && typeof imgString === "string") {
    split = imgString.split(new RegExp(",|;"));
  } else {
    res.status(400).json({ message: "Bad request" });
  }

  const result = await predict(Buffer.from(split[2], "base64"));
  console.log(result);
  res.json(result);
});

// Predict if the image contains a person wearing a mask using 
// Google AutoML model
async function predict(imgBuffer) {
  const request = {
    name: client.modelPath(projectId, location, modelId),
    payload: {
      image: {
        imageBytes: imgBuffer,
      },
    },
  };
  const [response] = await client.predict(request);

  for (const annotationPayload of response.payload) {
    return {
      name: annotationPayload.displayName,
      score: annotationPayload.classification.score,
    };
  }
}
module.exports = router;
