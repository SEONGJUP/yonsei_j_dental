import Header from './components/Header';
import Hero from './components/Hero';
import Reviews from './components/Reviews';
import Doctors from './components/Doctors';
import About from './components/About';
import Services from './components/Services';
import Hours from './components/Hours';
import Blog from './components/Blog';
import YouTube from './components/YouTube';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Reviews />
        <div className="snap-section"><Doctors /></div>
        <div className="snap-section"><About /></div>
        <div className="snap-section"><Services /></div>
        <div className="snap-section"><Hours /></div>
        <div className="snap-section"><Blog /></div>
        <YouTube />
        <div className="snap-section"><Contact /></div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
