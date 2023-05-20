import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function Sidebar() {
  const session = useSession();
  const user = session?.data?.user;
  return (
    <nav className="sticky top-0 px-2 py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li className="p-2">
          <Link href="/">Home</Link>
        </li>
        {(user !== undefined || user !== null) && (
          <li className="p-2">
            <Link href={`/profile/${user?.id}`}>Profile</Link>
          </li>
        )}
        {user !== undefined ? (
          <li className="p-2">
            <button onClick={() => void signOut()}>Logout</button>
          </li>
        ) : (
          <li className="p-2">
            <button onClick={() => void signIn()}>Login</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
