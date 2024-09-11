import React, { useContext } from 'react'
import { Brush, Type, Square, Circle, Eraser, Palette, MinusCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { ToolbarButton } from './ToolbarButton'
import { CanvasContext } from '@/context/CanvasContext'

export function Toolbar() {
  const {
    activeToolbar,
    setActiveToolbar,
    color,
    setColor,
    brushSize,
    setBrushSize,
    fontSize,
    setFontSize,
  } = useContext(CanvasContext)

  const handleToolClick = (tool: typeof activeToolbar) => {
    setActiveToolbar(tool)
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
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

  const getActiveSizeLabel = () => {
    switch (activeToolbar) {
      case 'draw':
      case 'eraser':
        return `Brush Size: ${brushSize}`
      case 'text':
        return `Font Size: ${fontSize}`
      default:
        return ''
    }
  }

  return (
    <Card className="fixed bottom-3 left-1/2 transform -translate-x-1/2 rounded-full p-1 flex gap-1 bg-background/80 backdrop-blur transition-all duration-300 hover:bg-background/90 hover:shadow-md">
      <ToolbarButton
        icon={Brush}
        isActive={activeToolbar === 'draw'}
        onClick={() => handleToolClick('draw')}
      />
      <ToolbarButton
        icon={Type}
        isActive={activeToolbar === 'text'}
        onClick={() => handleToolClick('text')}
      />
      <ToolbarButton
        icon={Square}
        isActive={activeToolbar === 'rectangle'}
        onClick={() => handleToolClick('rectangle')}
      />
      <ToolbarButton
        icon={Circle}
        isActive={activeToolbar === 'circle'}
        onClick={() => handleToolClick('circle')}
      />
      <ToolbarButton
        icon={Eraser}
        isActive={activeToolbar === 'eraser'}
        onClick={() => handleToolClick('eraser')}
      />
      <Popover>
        <PopoverTrigger asChild>
          <ToolbarButton
            icon={Palette}
            isActive={activeToolbar === 'color'}
            onClick={() => handleToolClick('color')}
          />
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="w-full h-10 cursor-pointer"
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <ToolbarButton
            icon={MinusCircle}
            isActive={activeToolbar === 'size'}
            onClick={() => handleToolClick('size')}
          />
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <Slider
            value={getSizeValue()}
            onValueChange={handleSizeChange}
            max={50}
            min={1}
            step={1}
          />
          <div className="mt-2 text-center">
            {getActiveSizeLabel()}
          </div>
        </PopoverContent>
      </Popover>
    </Card>
  )
}