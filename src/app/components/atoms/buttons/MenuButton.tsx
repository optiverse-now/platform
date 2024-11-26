'use client'

import { Menu } from 'lucide-react'
import { Button } from '@/app/components/ui/button'

type MenuButtonProps = {
  onClick: () => void;
}

export function MenuButton({ onClick }: MenuButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={onClick}
    >
      <Menu className="h-6 w-6" />
    </Button>
  )
} 