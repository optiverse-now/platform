import { Button } from '@/app/components/ui/button'
import { ActionButtonProps } from './types'

export function ActionButton({ 
  onClick, 
  variant = 'default',
  size = 'default',
  children,
  className = "",
  type = 'button',
  disabled = false
}: ActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      className={className}
      type={type}
      disabled={disabled}
    >
      {children}
    </Button>
  )
} 