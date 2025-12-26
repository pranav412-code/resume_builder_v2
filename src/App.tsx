import React, { useState } from 'react';
import { Landing } from './pages/Landing';
import { Editor } from './pages/Editor';

function App() {
  const [showLanding, setShowLanding] = useState(true);

  if (showLanding) {
    return <Landing onStart={() => setShowLanding(false)} />;
  }

  return <Editor onGoHome={() => setShowLanding(true)} />;
}

export default App;
