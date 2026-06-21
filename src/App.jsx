import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Subjects from './components/Subjects';
import Notes from './components/Notes';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Gallery from './components/Gallery';
import DailyQuote from './components/DailyQuote';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Subjects />
        <Notes />
        <Projects />
        <Achievements />
        <Gallery />
        <DailyQuote />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
