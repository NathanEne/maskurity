const projectId = 'maskurity-301220';
const location = 'us-central1';

//TODO: Add model ID after training is complete
//const modelId = 'YOUR_MODEL_ID';

const filePath = __dirName + "/resources/img.jpg";
const {PredictionServiceClient} = require('@google-cloud/automl').v1;
const fs = require('fs');

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

  for (const annotationPayload of response.payload) {
    console.log(`Predicted class name: ${annotationPayload.displayName}`);
    console.log(
      `Predicted class score: ${annotationPayload.classification.score}`
    );
  }
}

predict();
