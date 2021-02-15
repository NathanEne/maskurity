import React, { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useSpeechSynthesis } from "react-speech-kit";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import "./index.css";

const Camera = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [page, setPage] = useState("main");
  const [confidence, setConfidence] = useState(0);

  const { speak } = useSpeechSynthesis();

  const commands = [
    {
      command: "open the door (please)",
      callback: () => openCommand(),
    },
    {
      command: "I have an exemption",
      callback: () => exemption(),
    },
    {
      command: "clear",
      callback: ({ resetTranscript }) => {
        resetTranscript();
        setImage(null);
      },
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });

  const videoConstraints = {
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    console.log("image taken");
    console.log(imageSrc);
    return imageSrc;
  }, [webcamRef]);

  function sleep(ms) {
    // Synchronous Delay
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const sendImage = async (imgString) => {
    console.log("sending image");
    console.log(imgString);
    if (imgString) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/image`,
          {
            imgString,
          }
        );
        console.log(response.data);
        const { name, score } = response.data;
        setConfidence(score * 100);

        if (name === "with_mask") {
          speak({ text: "Access granted! Unlocking the door." });
          setPage("mask");
          await sleep(5500);
          setPage("main");
          resetTranscript();
        } else {
          speak({ text: "Access denied! Please wear a mask and try again." });
          setPage("no-mask");
          await sleep(5500);
          setPage("main");
          resetTranscript();
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred, please try again.");
      }
    }
  };

  const openCommand = () => {
    sendImage(capture());
  };

  const exemption = async () => {
    speak({
      text: "I will contact the manager to let you in, one moment please.",
    });
    setPage("exempt");
    await sleep(5500);
    setPage("main");
    resetTranscript();
  };

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    return () => SpeechRecognition.stopListening();
  }, [speak]);

  return (
    <div className="container-fluid">
      <div>
        <div className="Webcam">
          <Webcam
            audio={false}
            height={540}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={960}
            videoConstraints={videoConstraints}
          />
          {/* <div>
            <button onClick={capture} class="btn btn-primary">
              Capture photo
            </button>
          </div> */}
        </div>
        <div className="speech">Speech: {transcript}</div>
        <div>
          {image && (
            <div>
              <div>Image Taken</div>
              <img src={image} alt="missing" className="CapturedImage" />
              {/* <div>
                <button
                  onClick={() => sendImage(image)}
                  class="btn btn-primary"
                >
                  Send Photo
                </button>
              </div> */}
            </div>
          )}
        </div>
      </div>
      
      {page === "mask" && (
        <div id="mask-overlay">
          <div id="mask-text">Access Granted!</div>
          <div className="score">
            Mask detected with {confidence}% confidence.
          </div>
        </div>
      )}
      {page === "no-mask" && (
        <div id="no-mask-overlay">
          <div id="no-mask-text">
            Access Denied! <div>Please wear a mask, and try again.</div>
          </div>
          <div className="score">
            No mask detected with {confidence}% confidence.
          </div>
        </div>
      )}
      {page === "exempt" && (
        <div id="exempt-overlay">
          <div id="exempt-text">
            I will contact the manager to let you in, one moment please.
          </div>
        </div>
      )}
    </div>
  );
};

export default Camera;
