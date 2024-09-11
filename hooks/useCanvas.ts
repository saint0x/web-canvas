import { useCallback, useRef, useState, useContext, useEffect } from 'react'
import { CanvasContext } from '@/context/CanvasContext'
import { drawLine, drawText, drawRectangle, drawCircle, eraseArea } from '@/utils/canvasUtils'

export function useCanvas() {
  const {
    activeToolbar,
    color,
    brushSize,
    fontSize,
    font,
    isBold,
    isItalic,
    isUnderline,
    canvasRef,
  } = useContext(CanvasContext)

  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })
  const [text, setText] = useState('')
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 })
  const [isTyping, setIsTyping] = useState(false)
  const [shapeStart, setShapeStart] = useState({ x: 0, y: 0 })
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      contextRef.current = canvasRef.current.getContext('2d')
    }
  }, [canvasRef])

  useEffect(() => {
    if (isTyping && contextRef.current) {
      const ctx = contextRef.current
      ctx.save()
      ctx.font = `${isBold ? 'bold ' : ''}${isItalic ? 'italic ' : ''}${fontSize}px ${font}`
      ctx.fillStyle = color
      
      const textMetrics = ctx.measureText(text)
      ctx.clearRect(
        textPosition.x,
        textPosition.y - fontSize,
        textMetrics.width + fontSize, // Add some extra space
        fontSize * 1.5 // Increase the height to accommodate underline
      )

      drawText(ctx, text, textPosition.x, textPosition.y, color, fontSize, font, isBold, isItalic, isUnderline)
      ctx.restore()
    }
  }, [text, isTyping, textPosition, color, fontSize, font, isBold, isItalic, isUnderline])

  const startDrawing = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent
    setLastPosition({ x: offsetX, y: offsetY })
    setShapeStart({ x: offsetX, y: offsetY })
    setIsDrawing(true)
  }, [])

  const draw = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current || !canvasRef || !canvasRef.current) return
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
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          drawRectangle(ctx, shapeStart.x, shapeStart.y, offsetX - shapeStart.x, offsetY - shapeStart.y, color)
        }
        break
      case 'circle':
        const context = canvasRef.current.getContext('2d')
        if (context) {
          context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          const radius = Math.sqrt(Math.pow(offsetX - shapeStart.x, 2) + Math.pow(offsetY - shapeStart.y, 2))
          drawCircle(context, shapeStart.x, shapeStart.y, radius, color)
        }
        break
    }
  }, [isDrawing, activeToolbar, color, brushSize, lastPosition, shapeStart, canvasRef])

  const stopDrawing = useCallback(() => {
    setIsDrawing(false)
  }, [])

  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeToolbar === 'text') {
      const { offsetX, offsetY } = event.nativeEvent
      setTextPosition({ x: offsetX, y: offsetY })
      setIsTyping(true)
      setText('')
    } else {
      setIsTyping(false)
    }
  }, [activeToolbar])

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isTyping) return

    if (event.key === 'Enter') {
      setIsTyping(false)
      setText('')
    }
    // Remove the else if for Backspace and single character keys
    // The onChange handler in the input element will handle text updates
  }, [isTyping])

  return {
    startDrawing,
    draw,
    stopDrawing,
    handleCanvasClick,
    handleKeyDown,
    isTyping,
    text,
    setText,
  }
}