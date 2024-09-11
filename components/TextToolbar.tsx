import React, { useContext } from 'react'
import { Bold, Italic, Underline } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { ToolbarButton } from './ToolbarButton'
import { CanvasContext } from '@/context/CanvasContext'

const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact']

export function TextToolbar() {
  const {
    activeToolbar,
    color,
    setColor,
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
  } = useContext(CanvasContext)

  if (activeToolbar !== 'text') {
    return null
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }

  return (
    <Card className="fixed top-3 left-1/2 transform -translate-x-1/2 p-2 flex items-center gap-2 bg-background/80 backdrop-blur">
      <Select value={font} onValueChange={setFont}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select font" />
        </SelectTrigger>
        <SelectContent>
          {fonts.map((f) => (
            <SelectItem key={f} value={f}>{f}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ToolbarButton
        icon={Bold}
        isActive={isBold}
        onClick={() => setIsBold(!isBold)}
      />
      <ToolbarButton
        icon={Italic}
        isActive={isItalic}
        onClick={() => setIsItalic(!isItalic)}
      />
      <ToolbarButton
        icon={Underline}
        isActive={isUnderline}
        onClick={() => setIsUnderline(!isUnderline)}
      />
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        className="w-10 h-10 cursor-pointer"
      />
      <Slider
        value={[fontSize]}
        onValueChange={(value) => setFontSize(value[0])}
        max={72}
        min={8}
        step={1}
        className="w-32"
      />
    </Card>
  )
}