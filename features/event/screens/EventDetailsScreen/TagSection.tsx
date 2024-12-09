import React from "react";

import { Tag } from "@/features/core/components/Tag";

import { H3, XStack, YStack } from "tamagui";

interface TagListProps {
  title: string;
  tags: string[];
  renderTag?: (tag: string, index: number) => React.ReactNode;
}

export function TagSection({ title, tags, renderTag }: TagListProps) {
  return (
    <YStack gap="$2">
      <H3>{title}</H3>
      <XStack flexWrap="wrap" gap="$2">
        {tags.map((tag, index) =>
          renderTag ? renderTag(tag, index) : <Tag tag={tag} key={index} />
        )}
      </XStack>
    </YStack>
  );
}
