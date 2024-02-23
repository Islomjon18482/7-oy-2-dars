import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { useRef } from "react";
import { useCallback } from "react";

function App() {
  const captureRef = useRef(null);
  const [show, setShow] = useState(false);
  const [imgSrc, setImg] = useState([]);

  useEffect(() => {
    const images = JSON.parse(localStorage.getItem("images"));
    setImg(images);
  }, []);

  const capture = useCallback(() => {
    const imageSrc = captureRef.current.getScreenshot();
    const copy = imgSrc;
    copy.push(imageSrc);
    setImg(copy);
    localStorage.setItem("images", JSON.stringify(imgSrc));
  }, [captureRef]);

  return (
    <div>
      <div className="actions">
      <button onClick={() => setShow(true)}>Open webcam</button>
      <button onClick={() => setShow(false)}>Show images</button>
      <button onClick={capture}>Capture</button>
      </div>
      <div className="media">
      {show && (
        <div className="container">
          <Webcam height={600} width={600} ref={captureRef} />
        </div>
      )}
      </div>
        {!show && <h2>Images:</h2>}
      <div className="images">
        {imgSrc && !show &&
          imgSrc.map((el) => {
            return <img className="img" src={el} />
          })}
      </div>
    </div>
  );
}

export default App;
