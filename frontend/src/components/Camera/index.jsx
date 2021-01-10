import React from "react";
import Webcam from "react-webcam";

const Camera = () => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const webcamRef = React.useRef(null);

  const [images, setImages] = React.useState([]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImages([...images, imageSrc]);
    console.log(images);
  }, [webcamRef, images]);

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
      <button onClick={capture}>Capture photo</button>
      <div>
        {images.map((x) => (
          <img src={x} alt="missing" />
        ))}
      </div>
    </>
  );
};

export default Camera;
