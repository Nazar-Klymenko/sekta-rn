import React from "react";

import { Tag } from "@/features/core/components/Tag";

import { H2, XStack, YStack } from "tamagui";

interface TagListProps {
  title: string;
  tags: string[];
  renderTag?: (tag: string, index: number) => React.ReactNode;
}

export function TagSection({ title, tags, renderTag }: TagListProps) {
  return (
    <YStack gap="$2">
      <H2 fontWeight="700">{title}</H2>
      <XStack flexWrap="wrap" gap="$2">
        {tags.map((tag, index) =>
          renderTag ? renderTag(tag, index) : <Tag tag={tag} key={index} />
        )}
      </XStack>
    </YStack>
  );
}
