// App.js
import { Routes, Route } from 'react-router-dom';
import Landing from './routes/Landing';
import Dash from './routes/Dash';
import Four04 from './routes/Four04';
import './globals.css';
 
const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dash" element={<Dash />} />
            <Route path="*" element={<Four04 />} />
         </Routes>
      </>
   );
};
 
export default App;
