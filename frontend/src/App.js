import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { SnackbarProvider } from 'notistack';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import LikesPics from './components/LikesPics';
import About from './components/About';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dropzone from './components/imgTest';


const App = () => {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    setProgress(100)
  }, [])


  // setProgress(() => {
  //   setTimeout(() => {
  //     return 100
  //   }, 600);
  // })
  return (
    <>
      <BrowserRouter>
        <SnackbarProvider maxSnack={1} autoHideDuration={2000}>
          <Navbar progress={progress} setProgress={setProgress} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/favourites" element={<LikesPics />} />
            <Route path="/test" element={<Dropzone />} />
          </Routes>
        </SnackbarProvider>

      </BrowserRouter>
    </>
  )
}

export default App
