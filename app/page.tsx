'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Brush, Type, Square, Circle, Eraser, Palette, MinusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { drawLine, drawText, drawRectangle, drawCircle, eraseArea } from '@/utils/canvasUtils'

type ToolbarType = 'draw' | 'text' | 'rectangle' | 'circle' | 'eraser' | 'color' | 'size' | null;

export default function CollaborativeCanvas() {
  const [activeToolbar, setActiveToolbar] = useState<ToolbarType>('draw')
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)
  const [fontSize, setFontSize] = useState(16)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })
  const [text, setText] = useState('')
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 })
  const [shapeStart, setShapeStart] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const context = canvas.getContext('2d')
    if (!context) return

    context.lineCap = 'round'
    context.strokeStyle = color
    context.lineWidth = brushSize
    contextRef.current = context
  }, [color, brushSize])

  useEffect(() => {
    initializeCanvas()
    window.addEventListener('resize', initializeCanvas)
    return () => window.removeEventListener('resize', initializeCanvas)
  }, [initializeCanvas])

  const startDrawing = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent
    setLastPosition({ x: offsetX, y: offsetY })
    setShapeStart({ x: offsetX, y: offsetY })
    setIsDrawing(true)
  }, [])

  const draw = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return
    const { offsetX, offsetY } = event.nativeEvent

    switch (activeToolbar) {
      case 'draw':
        drawLine(contextRef.current, lastPosition.x, lastPosition.y, offsetX, offsetY, color, brushSize)
        setLastPosition({ x: offsetX, y: offsetY })
        break
      case 'eraser':
        eraseArea(contextRef.current, offsetX - brushSize / 2, offsetY - brushSize / 2, brushSize, brushSize)
        break
      case 'rectangle':
        contextRef.current.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
        drawRectangle(contextRef.current, shapeStart.x, shapeStart.y, offsetX - shapeStart.x, offsetY - shapeStart.y, color)
        break
      case 'circle':
        contextRef.current.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
        const radius = Math.sqrt(Math.pow(offsetX - shapeStart.x, 2) + Math.pow(offsetY - shapeStart.y, 2))
        drawCircle(contextRef.current, shapeStart.x, shapeStart.y, radius, color)
        break
    }
  }, [isDrawing, activeToolbar, color, brushSize, lastPosition, shapeStart])

  const stopDrawing = useCallback(() => {
    setIsDrawing(false)
  }, [])

  const handleToolClick = (tool: ToolbarType) => {
    setActiveToolbar(tool)
  }

  const handleTextSubmit = () => {
    if (!contextRef.current) return
    drawText(contextRef.current, text, textPosition.x, textPosition.y, color, fontSize)
    setText('')
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeToolbar === 'text') {
      const { offsetX, offsetY } = event.nativeEvent
      setTextPosition({ x: offsetX, y: offsetY })
    }
  }

  const handleSizeChange = (value: number[]) => {
    if (activeToolbar === 'draw' || activeToolbar === 'eraser') {
      setBrushSize(value[0])
    } else if (activeToolbar === 'text') {
      setFontSize(value[0])
    }
  }

  const getSizeValue = () => {
    if (activeToolbar === 'draw' || activeToolbar === 'eraser') {
      return [brushSize]
    } else if (activeToolbar === 'text') {
      return [fontSize]
    }
    return [1] // Default value
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onClick={handleCanvasClick}
        className="absolute top-0 left-0 w-full h-full"
      />
      
      <Card className="fixed bottom-3 left-1/2 transform -translate-x-1/2 rounded-full p-1 flex gap-1 bg-background/80 backdrop-blur transition-all duration-300 hover:bg-background/90 hover:shadow-md">
        <Button
          variant={activeToolbar === 'draw' ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => handleToolClick('draw')}
        >
          <Brush className="h-4 w-4" />
        </Button>
        <Button
          variant={activeToolbar === 'text' ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => handleToolClick('text')}
        >
          <Type className="h-4 w-4" />
        </Button>
        <Button
          variant={activeToolbar === 'rectangle' ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => handleToolClick('rectangle')}
        >
          <Square className="h-4 w-4" />
        </Button>
        <Button
          variant={activeToolbar === 'circle' ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => handleToolClick('circle')}
        >
          <Circle className="h-4 w-4" />
        </Button>
        <Button
          variant={activeToolbar === 'eraser' ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => handleToolClick('eraser')}
        >
          <Eraser className="h-4 w-4" />
        </Button>
        <Button
          variant={activeToolbar === 'color' ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => handleToolClick('color')}
        >
          <Palette className="h-4 w-4" />
        </Button>
        <Button
          variant={activeToolbar === 'size' ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => handleToolClick('size')}
        >
          <MinusCircle className="h-4 w-4" />
        </Button>
      </Card>

      {activeToolbar === 'text' && (
        <Card className="fixed bottom-16 left-1/2 transform -translate-x-1/2 p-2 flex items-center gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type text..."
          />
          <Button onClick={handleTextSubmit}>Add Text</Button>
        </Card>
      )}

      {activeToolbar === 'color' && (
        <Card className="fixed bottom-16 left-1/2 transform -translate-x-1/2 p-2">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10"
          />
        </Card>
      )}

      {activeToolbar === 'size' && (
        <Card className="fixed bottom-16 left-1/2 transform -translate-x-1/2 p-2 w-64">
          <Slider
            value={getSizeValue()}
            onValueChange={handleSizeChange}
            max={50}
            step={1}
          />
        </Card>
      )}
    </div>
  )
}