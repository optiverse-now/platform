import { LucideIcon } from 'lucide-react'

export type NavigationButtonProps = {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
} 

export type ActionButtonProps = {
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}