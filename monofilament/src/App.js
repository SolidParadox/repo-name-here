// App.js
import { Routes, Route } from 'react-router-dom';
import Landing from './routes/Landing';
import Dash from './routes/Dash';
import Cerberus from './routes/Cerberus';
import ToggleDash from './routes/ToggleDash';
import Four04 from './routes/Four04';
import './globals.css';
 
const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dash" element={<Dash />} />
            <Route path="/cerberus" element={<Cerberus />} />
            <Route path="/toggle" element={<ToggleDash />} />
            <Route path="*" element={<Four04 />} />
         </Routes>
      </>
   );
};
 
export default App;
