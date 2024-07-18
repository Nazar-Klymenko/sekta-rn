import { Toast, useToastState } from "@tamagui/toast";

export const CurrentToast = () => {
  const toast = useToastState();

  // don't show any toast if no toast is present or it's handled natively
  if (!toast || toast.isHandledNatively) {
    return null;
  }

  return (
    <Toast
      key={toast.id}
      borderRadius={"$4"}
      duration={5000}
      animation="100ms"
      enterStyle={{ x: -20, opacity: 0 }}
      exitStyle={{ x: -20, opacity: 0 }}
      opacity={1}
      x={0}
    >
      <Toast.Title>{toast.title}</Toast.Title>
      <Toast.Description>{toast.message}</Toast.Description>
      <Toast.Close />
    </Toast>
  );
};
