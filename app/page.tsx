import Image from 'next/image'
import Link from 'next/link' 
import '@/app/globals.css';

export default function Home() {
  return (
    <main>
      <Link href="/login">Login</Link>
      <br />
      <Link href="/register">Register</Link>
    </main>
  )
}
