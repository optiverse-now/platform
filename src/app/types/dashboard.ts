import { LucideIcon } from 'lucide-react'

// Navigation関連の型
export type NavigationItemType = {
  icon: LucideIcon;
  label: string;
  path: string;
}

// Tab関連の型
export type TabItem = {
  value: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

// Header関連の型
export type HeaderProps = {
  title: string;
  tabs?: {
    items: TabItem[];
  };
}

// Template関連の型
export type DashboardTemplateProps = {
  children: React.ReactNode;
  headerProps: HeaderProps;
  navigationItems: NavigationItemType[];
} 