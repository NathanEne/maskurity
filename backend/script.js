require("dotenv").config();
const header = '"';
const projectId = process.env.PROJECT_ID;
const location = process.env.LOCATION;
//TODO: Add model ID after training is complete
const modelId = process.env.MODEL_ID;
const filePath = __dirName + "/resources/img.jpg";

const { PredictionServiceClient } = require("@google-cloud/automl").v1;
const fs = require("fs");
const client = new PredictionServiceClient();
const content = fs.readFileSync(filePath);

async function predict() {
  const request = {
    name: client.modelPath(projectId, location, modelId),
    payload: {
      image: {
        imageBytes: content,
      },
    },
  };

  const [response] = await client.predict(request);

  let arr = [];
  for (const annotationPayload of response.payload) {
    let prediction = {
      name: annotationPayload.displayName,
      score: annotationPayload.classification.score,
    };
    arr.push(prediction);
    console.log(`Predicted class name: ${annotationPayload.displayName}`);
    console.log(
      `Predicted class score: ${annotationPayload.classification.score}`
    );
  }
  return arr;
}

predict();
