import { FiPhone } from 'react-icons/fi';
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
        <Doctors />
        <About />
        <Services />
        <Hours />
        <Blog />
        <YouTube />
        <Contact />
      </main>
      <Footer />

      {/* 모바일 전용 플로팅 전화 버튼 */}
      <a href="tel:02-815-2875" className="float-call" aria-label="전화 상담">
        <FiPhone size={24} />
      </a>
    </div>
  );
}

export default App;
