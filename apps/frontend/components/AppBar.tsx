"use client"

import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs';


export function AppBar(){

    return  <div className='flex justify-between itens-center p-4'>
        <div> Dpin- Monitor</div>
        <div>

            <SignedOut>
                <SignInButton />
                <SignUpButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>

        </div>
    </div>


}