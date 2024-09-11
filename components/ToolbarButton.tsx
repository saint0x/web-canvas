import React from 'react'
import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'

interface ToolbarButtonProps {
  icon: LucideIcon
  isActive: boolean
  onClick: () => void
}

export function ToolbarButton({ icon: Icon, isActive, onClick }: ToolbarButtonProps) {
  return (
    <Button
      variant={isActive ? 'secondary' : 'ghost'}
      size="icon"
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
    </Button>
  )
}