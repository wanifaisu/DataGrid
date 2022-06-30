import DataTable from './component/DataTable/DataTable';
import { Routes, Route, Link } from 'react-router-dom';
import DataTableComments from './component/DataTableCommnts/DataTableComments';
import Users from './component/Users/Users';
function App() {
  return (
    <div style={{ marginLeft: '20px', marginRight: '20px' }}>
      <Routes>
        <Route path='/' element={<Users />} />
        <Route path='/posts' element={<DataTable />} />
        <Route path='/comment' element={<DataTableComments />} />
      </Routes>
    </div>
  );
}

export default App;
