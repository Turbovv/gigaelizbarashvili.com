import { signOut, useSession } from 'next-auth/react'

export default function SignOut() {
    const { data: session } = useSession()
    return (
        <div>
            <p>Welcome, {session?.user?.name}!</p>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    )
}
