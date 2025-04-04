"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { useSession, signOut } from "next-auth/react"

export function Nav() {
  const { data: session } = useSession()

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 flex-1">
          <Link href="/" className="font-semibold text-xl">
            WorkSpace Share
          </Link>
          <Link href="/spaces" className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Browse
          </Link>
          {session && (
            <Link href="/spaces/list" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              List Space
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {session?.user ? (
            <>
              <span className="text-sm text-gray-500">
                {session.user.name || session.user.email}
              </span>
              <Button variant="ghost" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
