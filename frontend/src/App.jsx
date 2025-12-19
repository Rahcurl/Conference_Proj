import './App.css';
import { 
    SignedOut, 
    SignedIn,       // <--- ADDED: You must import the SignedIn component
    SignInButton, 
    SignOutButton, 
    UserButton      // <--- ADDED: UserButton is also needed from Clerk
} from '@clerk/clerk-react';

function App() {

  return (
    <>
      <h1>Welcome to the App</h1>
      
      <SignedOut>
        <p>Please sign in to continue.</p>
        <SignInButton mode="modal">
          <button>
            Login
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <p>You are logged in!</p>
        
        <UserButton /> 
        <SignOutButton />
      </SignedIn>
      
    </>
  );
}

export default App;