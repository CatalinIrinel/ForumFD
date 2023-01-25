import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import AdminRoute from './components/AdminRoute';
import { Box } from '@chakra-ui/react';
import {
  CategoryPage,
  CreatePost,
  DashboardPage,
  GDPR,
  // HomePage,
  LoginPage,
  PollPage,
  PostPage,
  Register,
  Tnc,
  Tou,
  UserPage,
} from './pages';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Sidebar />
        <Box
          marginTop={'60px'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          bgColor={'#f1f1f1'}
        >
          <Routes>
            <Route path="/" element={<PollPage />} />
            <Route path="/creaza-postare" element={<CreatePost />} />
            <Route path="/c/:category" element={<CategoryPage />} />

            <Route path="/utilizator" element={<UserPage />} />
            <Route path="/logare" element={<LoginPage />} />
            <Route path="/inregistrare" element={<Register />} />

            <Route path="/sondaj" element={<PollPage />} />
            <Route path="/:slug" element={<PostPage />} />

            <Route path="/gdpr" element={<GDPR />} />
            <Route path="/termeni-si-conditii" element={<Tnc />} />
            <Route path="/termeni-de-utilizare" element={<Tou />} />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <DashboardPage />
                </AdminRoute>
              }
            />
          </Routes>
        </Box>
      </Router>
    </>
  );
}

export default App;
