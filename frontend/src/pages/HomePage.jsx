    import { 
    SignInButton, 
    SignOutButton, 
    UserButton, 
    SignedIn, 
    SignedOut 
    } from '@clerk/clerk-react';
    import React from 'react';
import toast from 'react-hot-toast';

    function HomePage() {
    return (
        <div>
            <button className="btn btn-secondary" onClick={() => toast.success("This is success toast")}>Click me</button>

            <SignedOut>
            <SignInButton mode="modal">
                <button className="btn">Sign up please</button>
            </SignInButton>
            </SignedOut>

            <SignedIn>
            <p>You are logged in!</p>
            <SignOutButton />
            <UserButton /> 
            </SignedIn>
        </div>
    );
    }

    export default HomePage;