import React, { useRef, useEffect, useContext } from 'react'
import { useCanvas } from '@/hooks/useCanvas'
import { CanvasContext } from '@/context/CanvasContext'

export function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { setCanvasRef, activeToolbar } = useContext(CanvasContext)
  const { 
    startDrawing, 
    draw, 
    stopDrawing, 
    handleCanvasClick, 
    handleKeyDown,
    isTyping,
    text,
    setText
  } = useCanvas()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    context.lineCap = 'round'
    context.lineJoin = 'round'

    setCanvasRef(canvasRef)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setCanvasRef])

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onClick={handleCanvasClick}
        tabIndex={0}
        className={`absolute top-0 left-0 w-full h-full outline-none ${
          activeToolbar === 'text' ? 'cursor-text' : 'cursor-default'
        }`}
      />
      {isTyping && (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="opacity-0 absolute"
        />
      )}
    </>
  )
}