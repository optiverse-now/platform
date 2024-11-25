'use client'

import { Button } from "@/app/components/ui/button"
import { NavigationButtonProps } from './types'

export function NavigationButton({ 
  icon: Icon,
  label, 
  isActive, 
  onClick 
}: NavigationButtonProps) {
  return (
    <Button
      variant={isActive ? 'default' : 'ghost'}
      className="w-full justify-start"
      onClick={onClick}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
} 