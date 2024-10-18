import React, { useState } from "react";

import { Edit3, Plus, X } from "@tamagui/lucide-icons";

import {
  Button,
  Dialog,
  Input,
  Paragraph,
  Text,
  XStack,
  YStack,
} from "tamagui";

type PillProps = {
  item: string;
  onEdit: (item: string) => void;
  onRemove: (item: string) => void;
};

const Pill: React.FC<PillProps> = ({ item, onEdit, onRemove }) => (
  <XStack
    backgroundColor="$blue8"
    borderRadius="$10"
    borderColor="#F56E14"
    borderWidth={2}
    paddingHorizontal="$3"
    paddingVertical="$2"
    marginRight="$2"
    marginBottom="$2"
    alignItems="center"
  >
    <XStack
      flexGrow={1}
      onPress={() => onEdit(item)}
      pressStyle={{ opacity: 0.8 }}
    >
      <Text color="white">{item}</Text>
    </XStack>
    <Button
      size="$2"
      circular
      icon={X}
      onPress={() => onRemove(item)}
      marginLeft="$1"
    />
  </XStack>
);

type PillInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  placeholder?: string;
  addLabel?: string;
  editLabel?: string;
};

const PillInput: React.FC<PillInputProps> = ({
  value,
  onChange,
  error,
  placeholder = "Enter item",
  addLabel = "Add Item",
  editLabel = "Edit Item",
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const addItem = () => {
    if (currentItem && !value.includes(currentItem)) {
      onChange([...value, currentItem]);
      setCurrentItem("");
      setModalOpen(false);
    }
  };

  const editItem = (index: number, newItem: string) => {
    const newItems = [...value];
    newItems[index] = newItem;
    onChange(newItems);
    setCurrentItem("");
    setEditIndex(-1);
    setModalOpen(false);
  };

  const removeItem = (itemToRemove: string) => {
    onChange(value.filter((item) => item !== itemToRemove));
  };

  return (
    <YStack>
      <XStack flexWrap="wrap">
        {value.map((item, index) => (
          <Pill
            key={item}
            item={item}
            onEdit={() => {
              setCurrentItem(item);
              setEditIndex(index);
              setModalOpen(true);
            }}
            onRemove={() => removeItem(item)}
          />
        ))}
        <Button
          icon={Plus}
          circular
          onPress={() => {
            setCurrentItem("");
            setEditIndex(-1);
            setModalOpen(true);
          }}
        />
      </XStack>
      {error && <Paragraph color="$red10">{error}</Paragraph>}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>
              {editIndex === -1 ? addLabel : editLabel}
            </Dialog.Title>
            <Input
              value={currentItem}
              onChangeText={setCurrentItem}
              placeholder={placeholder}
            />
            <XStack justifyContent="flex-end">
              <Dialog.Close asChild>
                <Button>Cancel</Button>
              </Dialog.Close>
              <Button
                onPress={() =>
                  editIndex === -1
                    ? addItem()
                    : editItem(editIndex, currentItem)
                }
              >
                {editIndex === -1 ? "Add" : "Save"}
              </Button>
            </XStack>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </YStack>
  );
};

export default PillInput;
