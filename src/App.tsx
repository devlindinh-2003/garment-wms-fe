import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Button } from './components/ui/button';
import { Map } from 'lucide-react';

function App() {
  return (
    <div>
      <Map color='red' size={30} />
    </div>
  );
}

export default App;
