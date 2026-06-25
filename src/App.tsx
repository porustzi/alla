import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Results from './components/Results';
import Methods from './components/Methods';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = ''; };
  }, []);

  return (
    <div className="min-h-screen bg-white text-uk-navy font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Results />
        <Methods />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
