import { Input } from '@/app/components/ui/input'
import { FormInputProps } from './types'

export function FormInput({ id, value, onChange, required, className = "" }: FormInputProps) {
  return (
    <Input
      id={id}
      value={value}
      onChange={onChange}
      className={`mt-1 ${className}`}
      required={required}
    />
  )
} 