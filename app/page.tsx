import Image from 'next/image'
import Link from 'next/link' 

export default function Home() {
  return (
    <main>
      <Link href="/login">Login</Link>
      <br />
      <Link href="/register">Register</Link>
    </main>
  )
}
