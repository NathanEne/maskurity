import React from "react";
import Webcam from "react-webcam";
import axios from "axios";

import "./index.css";

const Camera = () => {
  const webcamRef = React.useRef(null);
  const [image, setImage] = React.useState(null);

  const videoConstraints = {
    facingMode: "user",
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    console.log(image);
  }, [webcamRef, image]);

  const sendImage = async (imgString) => {
    const s1 = imgString.split(new RegExp(",|;"));
    try {
      const response = await axios.post("http://localhost:3001/api/image", {
        imgString,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Webcam
        audio={false}
        height={540}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={960}
        videoConstraints={videoConstraints}
      />
      <div>
        <button onClick={capture}>Capture photo</button>
      </div>
      {image && (
        <div>
          <img src={image} alt="missing" className="CapturedImage" />
          <div>
            <button onClick={() => sendImage(image)}>Send Photo</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Camera;
