export type SubItem = {
  href: string;
  text: string;
  description: string;
};

export type NavItemProps = {
  href?: string;
  text: string;
  subItems?: SubItem[];
};
