import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
import Layout from './pages/Layout';
import Vitals from './pages/Vitals';
import DeviceStatus from './pages/DeviceStatus';
import Reports from './pages/Reports';
import Overview from './pages/Overview';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Overview/>}/>
          <Route path="/vitals" element={<Vitals/>}/>
          <Route path="/device-status" element={<DeviceStatus/>}/>
          <Route path="/reports" element={<Reports/>}/>
        </Route>
      </Routes>
  )
}

export default App;