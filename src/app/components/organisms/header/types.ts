import { TabItem } from '../../molecules/tabs/types'

export type HeaderProps = {
  title: string;
  tabs?: {
    items: TabItem[];
  };
} 