export type TabItem = {
  value: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

export type NavigationTabProps = {
  items: TabItem[];
  defaultValue?: string;
} 