'use client'

import { NavigationButton } from '@/app/components/atoms/buttons/NavigationButton'
import { NavigationListProps } from './types'

export function NavigationList({ items, currentPath, onNavigate }: NavigationListProps) {
  return (
    <nav className="space-y-2">
      {items.map((item) => (
        <NavigationButton
          key={item.path}
          icon={item.icon}
          label={item.label}
          isActive={
            item.path === '/applications/dashboard'
              ? currentPath === item.path
              : currentPath.includes(item.path)
          }
          onClick={() => onNavigate(item.path)}
        />
      ))}
    </nav>
  )
} 