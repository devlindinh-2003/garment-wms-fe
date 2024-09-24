export interface MenuProps {
    title: string;
    renderIcon: JSX.Element;
    link: string;
  }
  export interface SideBarProps {
    menu : MenuProps[]
  }