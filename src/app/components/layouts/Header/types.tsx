type HeaderProps = {
  title: string;
  tabs?: {
    items: {
      value: string;
      label: string;
      icon: React.ReactNode;
      href: string;
    }[];
  };
}

export type { HeaderProps }
