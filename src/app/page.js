"use client";
import { Inter } from 'next/font/google'
import Chess from './Chess'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <Chess />
    </main>
  )
}
