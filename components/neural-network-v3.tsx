"use client"

import React, { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"
import { addNodes } from "@/lib/utils"
import { PaginationComponent } from "./pagination"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export function NeuralNetworkV3Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const animationRef = useRef<number>()
  const mousePos = useRef<{ x: number; y: number } | null>(null)
  const [nodeCount, setNodeCount] = useState(0)

  const addNode = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const newNode: Node = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: 15 + Math.random() * 10,
    }
    nodesRef.current.push(newNode)
    setNodeCount((prev) => prev + 1)
  }

  const removeNode = () => {
    if (nodesRef.current.length > 0) {
      nodesRef.current.pop()
      setNodeCount((prev) => prev - 1)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Add initial nodes
    addNodes(10, addNode)

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodesRef.current.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        // Bounce off walls
        if (node.x < node.radius || node.x > canvas.width - node.radius) {
          node.vx *= -1
        }
        if (node.y < node.radius || node.y > canvas.height - node.radius) {
          node.vy *= -1
        }

        // Collision with mouse
        if (mousePos.current) {
          const dx = mousePos.current.x - node.x
          const dy = mousePos.current.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < node.radius + 50) {
            const angle = Math.atan2(dy, dx)
            const targetX = node.x - Math.cos(angle) * (node.radius + 50)
            const targetY = node.y - Math.sin(angle) * (node.radius + 50)
            node.x -= (node.x - targetX) * 0.1
            node.y -= (node.y - targetY) * 0.1
          }
        }

        // Draw node
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius
        )
        gradient.addColorStop(0, "rgba(64, 224, 208, 1)") // Turquoise core
        gradient.addColorStop(1, "rgba(64, 224, 208, 0)") // Transparent edge

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient

        // Add 3D-like shadow
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
        ctx.shadowBlur = 10
        ctx.shadowOffsetX = 5
        ctx.shadowOffsetY = 5

        ctx.fill()

        // Reset shadow for other drawings
        ctx.shadowColor = "transparent"
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0

        // Apply damping
        node.vx *= 0.99
        node.vy *= 0.99
      })

      // Draw connections
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 1
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          ctx.beginPath()
          ctx.moveTo(nodesRef.current[i].x, nodesRef.current[i].y)
          ctx.lineTo(nodesRef.current[j].x, nodesRef.current[j].y)
          ctx.stroke()
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mousePos.current = null
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex max-sm:w-full max-sm:flex-col sm:space-x-4 gap-2 px-4">
        <Button onClick={addNode} className="bg-green-500 hover:bg-green-600">
          <Plus className="mr-2 h-4 w-4" /> Add Node ({nodeCount})
        </Button>
        <Button
          onClick={removeNode}
          className="bg-red-500 hover:bg-red-600"
          disabled={nodeCount === 0}
        >
          <Minus className="mr-2 h-4 w-4" /> Remove Node
        </Button>
        <PaginationComponent />
      </div>
    </div>
  )
}
