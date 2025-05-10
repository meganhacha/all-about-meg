import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import AboutMe from  './pages/AboutMe';
import Blog from './pages/Blog';
import Contact from "./pages/Contact";
import PostForm from "./pages/PostForm";
import PostPage from "./pages/PostPage";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog/:slug" element={<PostPage />} /> 
        <Route path="/create" element={<PostForm />} />
        <Route path="/edit/:slug" element={<PostForm />} />
      </Routes>
    </Router>
  );
}

export default App;
