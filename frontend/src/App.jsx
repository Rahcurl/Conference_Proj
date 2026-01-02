import { 
    SignedOut, 
    SignedIn,      
    SignInButton, 
    SignOutButton, 
    UserButton,
    useUser
} from '@clerk/clerk-react';
import { Routes,Route,Navigate } from 'react-router';
import HomePage from './pages/HomePage';
import ProblemsPage from './pages/ProblemsPage';
import { Toaster } from 'react-hot-toast';
import DashboardPage from './pages/DashboardPage';

  
function App() {

  const { isSignedIn, isLoaded} = useUser();
  if(!isLoaded) return null; //reduce the flickering effect while refreshing and rendering
  return (
    <>
    <Routes>
    
  <Route 
    path="/" 
    element={isSignedIn ? <Navigate to="/dashboard" /> : <HomePage />} 
  />
  <Route 
    path="/dashboard" 
    element={isSignedIn ? <DashboardPage /> : <Navigate to="/" />} 
  />
  <Route 
    path="/problems" 
    element={isSignedIn ? <ProblemsPage /> : <Navigate to="/" />} 
  />
    </Routes>
    <Toaster toastOptions={{duration:3000}}/>
    </>
  );
}

export default App;
