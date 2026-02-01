import Header from './components/Header';
import Location from './components/Location';
import Program from './components/Program';
import Wishes from './components/Wishes';
import DressCode from './components/DressCode';
import RSVPForm from './components/RSVPForm';
import Footer from './components/Footer';
import './styles/global.css';

function App() {
  return (
    <>
      <main>
        <Header />
        <Location />
        <Program />
        <Wishes />
        <DressCode />
        <RSVPForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
