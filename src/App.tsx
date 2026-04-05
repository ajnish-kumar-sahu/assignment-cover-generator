import { Outlet } from 'react-router-dom';
import ParticlesBg from './components/ParticlesBg';
import Toaster from './components/Toaster';

function App() {
  return (
    <>
      <ParticlesBg />
      <main className="relative z-10 w-full min-h-screen">
        <Outlet />
        <Toaster />
      </main>
    </>
  );
}

export default App;
