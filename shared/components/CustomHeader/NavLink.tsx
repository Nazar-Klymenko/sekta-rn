import { Link } from "expo-router";
import { Text, XStack, styled } from "tamagui";

interface NavLinkProps {
  href: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onPress?: () => void;
}
const MenuLink = styled(XStack, {
  alignItems: "center",
  gap: "$3",
  paddingVertical: "$2",
  paddingHorizontal: "$2",
});

const MenuText = styled(Text, {
  fontSize: "$3",
  color: "$color",
});

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
