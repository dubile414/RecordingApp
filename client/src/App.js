import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './components/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Logout from './components/Logout';
import AudioRecorder from './components/AudioRecorder';
import VideoRecorder from './components/VideoRecorder';
import ScreenRecorder from './components/ScreenRecorder';

function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <Routes>
          <Route path='/register' element={<Signup />} ></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/logout' element={<Logout />}></Route>
          <Route path='/audio' element={<AudioRecorder />} ></Route>
          <Route path='/video' element={<VideoRecorder/>} ></Route>
          <Route path='/screen' element={<ScreenRecorder />} ></Route>

        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;
