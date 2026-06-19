import Hero from './components/Hero';
import About from './components/About';
import Results from './components/Results';
import Methods from './components/Methods';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <About />
        <Results />
        <Methods />
        <Contact />
      </main>
    </div>
  );
}

export default App;
