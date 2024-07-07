import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import store from './redux/store';
import './App.css';

import LogoBar from './components/LogoBar';
import Navbar from './components/Navbar';
import NoPageFound from './components/NoPageFound';
import CreateFlashCard from './pages/CreateFlashCard';
import FlashCardDetails from './pages/FlashCardDetails';
import MyFlashCard from './pages/MyFlashcard';


function App() {
   return (
    <div className="App">
     <LogoBar/>
     <div>
         {/* Wrap the entire app in the Redux Provider */}
         <Provider store={store}>
            <Router>
              <Navbar/>
              <Routes>
               <Route path='/createflashcard' element={<CreateFlashCard/>}>CreateFlashcard</Route>
               <Route path='/myFlashcard' element={<MyFlashCard/>}>MyFlashcard</Route>
               <Route path='/flashCardDetails' element={<FlashCardDetails/>}>FlashCardDetails Page</Route>
               <Route path='*' element={<CreateFlashCard/>}>Default Page</Route>
               <Route path='*' element={<NoPageFound/>}>Page Not Found</Route>
              </Routes>
            </Router>
         </Provider>
     </div>
    </div>
   )
}

export default App;
