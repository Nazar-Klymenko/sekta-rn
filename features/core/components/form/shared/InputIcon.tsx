import React from "react";

interface InputIconProps {
  icon: React.ElementType;
}

export function InputIcon({ icon: Icon }: InputIconProps) {
  return (
    <Icon
      style={{
        position: "absolute",
        left: 16,
        color: "grey",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 1,
        size: 16,
      }}
    />
  );
}
