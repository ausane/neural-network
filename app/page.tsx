"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function NeuralNetwork() {
  const router = useRouter()
  useEffect(() => {
    router.push("/neural-network/v1")
  })
  return (
    <div className="w-full h-screen bg-black">
      <h2>Redirecting...</h2>
    </div>
  )
}
