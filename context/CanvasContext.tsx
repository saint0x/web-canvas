import React, { createContext, useState, ReactNode, RefObject } from 'react'

type ToolbarType = 'draw' | 'text' | 'rectangle' | 'circle' | 'eraser' | 'color' | 'size' | null

interface CanvasContextType {
  activeToolbar: ToolbarType
  setActiveToolbar: (toolbar: ToolbarType) => void
  color: string
  setColor: (color: string) => void
  brushSize: number
  setBrushSize: (size: number) => void
  fontSize: number
  setFontSize: (size: number) => void
  font: string
  setFont: (font: string) => void
  isBold: boolean
  setIsBold: (bold: boolean) => void
  isItalic: boolean
  setIsItalic: (italic: boolean) => void
  isUnderline: boolean
  setIsUnderline: (underline: boolean) => void
  canvasRef: RefObject<HTMLCanvasElement> | null
  setCanvasRef: (ref: RefObject<HTMLCanvasElement>) => void
}

export const CanvasContext = createContext<CanvasContextType>({} as CanvasContextType)

export function CanvasProvider({ children }: { children: ReactNode }) {
  const [activeToolbar, setActiveToolbar] = useState<ToolbarType>('draw')
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)
  const [fontSize, setFontSize] = useState(16)
  const [font, setFont] = useState('Arial')
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [canvasRef, setCanvasRef] = useState<RefObject<HTMLCanvasElement> | null>(null)

  return (
    <CanvasContext.Provider
      value={{
        activeToolbar,
        setActiveToolbar,
        color,
        setColor,
        brushSize,
        setBrushSize,
        fontSize,
        setFontSize,
        font,
        setFont,
        isBold,
        setIsBold,
        isItalic,
        setIsItalic,
        isUnderline,
        setIsUnderline,
        canvasRef,
        setCanvasRef,
      }}
    >
      {children}
    </CanvasContext.Provider>
  )
}