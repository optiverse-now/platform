import { Textarea } from '@/app/components/ui/textarea'
import { FormTextareaProps } from './types'

export function FormTextarea({ 
  id, 
  value, 
  onChange, 
  rows = 10,
  required,
  className = "" 
}: FormTextareaProps) {
  return (
    <Textarea
      id={id}
      value={value}
      onChange={onChange}
      className={`mt-1 ${className}`}
      rows={rows}
      required={required}
    />
  )
} 