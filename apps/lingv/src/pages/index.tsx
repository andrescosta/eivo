import { GetServerSideProps } from 'next'
import { auth } from '@/auth'
import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <button 
          onClick={() => signIn()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign in
        </button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4">Hello World</h1>
        <p>Welcome, {session?.user?.email}</p>
        <button 
          onClick={() => signOut()}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await auth(context)
  
  return {
    props: {
      session
    }
  }
}