import React, { useState } from 'react'
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder';
import Navigation from './Navigation';
import axios from 'axios';


const VideoRecorder = () => {
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
        video: true
    });

    const [recordedVideoBlob, setRecordedVideoBlob] = useState(null);

    const handleSaveVideo = async () => {
        if (mediaBlobUrl) {
            // Convert the Blob URL to a Blob object
            const response = await fetch(mediaBlobUrl);
            const blob = await response.blob();
      
            // Set the recorded video blob
            setRecordedVideoBlob(blob);
      
            // Now, you can use `blob` in your FormData
            const formData = new FormData();
            formData.append('video', blob);
      
            try {
              await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
              // Handle successful upload
            } catch (error) {
              console.error(error);
              // Handle upload error
            }
          }
      
    };

    return (
        <div>
            <Navigation />

            <div className='container' >
                <div style={{display:"flex" , flexDirection:"column" , justifyContent:"center", width:"500px", marginTop:"100px" }} >
                    <h2>video Recorder</h2>
                    {status === "idle" && <button className='btn btn-primary' onClick={startRecording}>Start Recording</button>}
                    {status === "recording" && <button className='btn btn-primary' onClick={stopRecording}>Stop Recording</button>}
                    {mediaBlobUrl && (
                        <div>
                            <video  src={mediaBlobUrl} autoPlay controls />
                            <button onClick={handleSaveVideo}>Save Video</button>
                        </div>
                    )}
                </div>
            </div>


        </div>
    )
}

export default VideoRecorder