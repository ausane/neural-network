"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"
import { addNodes } from "@/lib/utils"
import { PaginationComponent } from "./pagination"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

export function NeuralNetworkV2Component() {
  const [nodes, setNodes] = useState<Node[]>([])
  const nodesRef = useRef(nodes) // Use a ref to store nodes
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  const addNode = () => {
    const newNode = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }
    setNodes((prevNodes) => [...prevNodes, newNode])
    nodesRef.current = [...nodesRef.current, newNode] // Update ref with the new node
  }

  const removeNode = () => {
    setNodes((prevNodes) => prevNodes.slice(0, -1))
    nodesRef.current = nodesRef.current.slice(0, -1) // Update ref when a node is removed
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

    addNodes(2, addNode)

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update node positions using ref (avoiding setNodes)
      nodesRef.current = nodesRef.current.map((node) => ({
        ...node,
        x: node.x + node.vx,
        y: node.y + node.vy,
        vx:
          node.x + node.vx > canvas.width || node.x + node.vx < 0
            ? -node.vx
            : node.vx,
        vy:
          node.y + node.vy > canvas.height || node.y + node.vy < 0
            ? -node.vy
            : node.vy,
      }))

      // Draw connections
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.lineWidth = 1
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          ctx.beginPath()
          ctx.moveTo(nodesRef.current[i].x, nodesRef.current[i].y)
          ctx.lineTo(nodesRef.current[j].x, nodesRef.current[j].y)
          ctx.stroke()
        }
      }

      // Draw nodes
      ctx.fillStyle = "rgba(0, 255, 255, 0.8)"
      nodesRef.current.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 10, 0, Math.PI * 2)
        ctx.fill()
      })

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

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex max-sm:w-full max-sm:flex-col sm:space-x-4 gap-2 px-4">
        <Button onClick={addNode} className="bg-green-500 hover:bg-green-600">
          <Plus className="mr-2 h-4 w-4" /> Add Node ({nodes.length})
        </Button>
        <Button
          onClick={removeNode}
          className="bg-red-500 hover:bg-red-600"
          disabled={nodes.length === 0}
        >
          <Minus className="mr-2 h-4 w-4" /> Remove Node
        </Button>
        <PaginationComponent />
      </div>
    </div>
  )
}
