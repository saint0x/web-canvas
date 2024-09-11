'use client'

import React from 'react'
import { CanvasProvider } from '@/context/CanvasContext'
import { Canvas } from '@/components/Canvas'
import { Toolbar } from '@/components/Toolbar'
import { TextToolbar } from '@/components/TextToolbar'

export default function CollaborativeCanvas() {
  return (
    <CanvasProvider>
      <div className="h-screen w-screen overflow-hidden relative">
        <Canvas />
        <Toolbar />
        <TextToolbar />
      </div>
    </CanvasProvider>
  )
}