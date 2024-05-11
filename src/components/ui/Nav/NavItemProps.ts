export interface NavItemProps {
  href?: string;
  text: string;
  subItems?: SubItem[];
}

export interface SubItem {
  href: string;
  text: string;
  description: string;
}
