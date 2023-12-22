// signin page for Google OAuth2 signin using next-auth
// https://next-auth.js.org/configuration/providers
// https://next-auth.js.org/configuration/providers#oauth-provider-options

import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth"
import SignInButton from "./signinButton"


export default async function SignIn() {
    const providers = await getProviders()
    const session = await getServerSession()

    if (session) {
        return (
            <>
                <h1>Signed in as {session.user.email}</h1>
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }

    return (
        <main className="w-full h-full flex flex-col items-center justify-center bottom-10 ">
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <SignInButton provider={provider} />
                </div>
            ))}
        </main>
    )
}