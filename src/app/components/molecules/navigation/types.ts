import { LucideIcon } from 'lucide-react'

export type NavigationItemType = {
  icon: LucideIcon;
  label: string;
  path: string;
}

export type NavigationListProps = {
  items: NavigationItemType[];
  currentPath: string;
  onNavigate: (path: string) => void;
} 