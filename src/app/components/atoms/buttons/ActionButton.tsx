import { Button } from '@/app/components/ui/button'
import { ActionButtonProps } from './types'

export function ActionButton({ 
  onClick, 
  variant = 'default',
  size = 'default',
  children,
  className = "",
}: ActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </Button>
  )
} 