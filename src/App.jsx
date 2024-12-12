import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import DoormanPage from './components/DoormanPage';
import UnauthorizedPage from './components/UnauthorizedPage';

function App() {
  return (
    <div  className="flex justify-center">
    <AuthProvider>
      <Router>
        <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl w-full space-y-8">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doorman"
                element={
                  <ProtectedRoute allowedRoles={['doorman']}>
                    <DoormanPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </Router>
    </AuthProvider>
    </div>
  );
}

export default App; 