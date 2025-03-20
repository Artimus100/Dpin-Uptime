"use client"

import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs';


export function AppBar(){

    return  <div className='flex justify-between itens-center p-4'>
        <div> Dpin- Monitolr</div>
        <div>
        <ClerkProvider>

            <SignedOut>
                <SignInButton />
                <SignUpButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
            </ClerkProvider>

        </div>
    </div>


}