import { Paragraph, XStack, styled } from "tamagui";

import { Link } from "expo-router";

interface NavLinkProps {
  href: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onPress?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  icon,
  children,
  onPress,
}) => (
  <Link href={href as any} onPress={onPress}>
    <MenuLink>
      {icon}
      <MenuText>{children}</MenuText>
    </MenuLink>
  </Link>
);
export const NavLinkButton: React.FC<Omit<NavLinkProps, "href">> = ({
  icon,
  children,
  onPress,
}) => (
  <MenuLink>
    {icon}
    <MenuText>{children}</MenuText>
  </MenuLink>
);
const MenuLink = styled(XStack, {
  alignItems: "center",
  gap: "$3",
  paddingVertical: "$2",
  paddingHorizontal: "$2",
});

const MenuText = styled(Paragraph, {
  fontSize: "$3",
  color: "$color",
});
