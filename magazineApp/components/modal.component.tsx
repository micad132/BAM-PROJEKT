import React, { ReactNode, useState } from 'react';
import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Paragraph,
  Sheet, styled,
  TooltipSimple,
  Unspaced,
  XStack,
} from 'tamagui';

type Props = {
    modalTitle: string,
    modalButtonText: string,
    modalContent: ReactNode,
    onSave: () => void,
}

const StyledButton = styled(Button, {
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '40%',
  marginTop: 20,
});

const ModalComponent = ({
  modalTitle, modalButtonText, modalContent, onSave,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <Dialog.Trigger asChild>
        <StyledButton>{modalButtonText}</StyledButton>
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{
            x: 0, y: -20, opacity: 0, scale: 0.9,
          }}
          exitStyle={{
            x: 0, y: 10, opacity: 0, scale: 0.95,
          }}
          unstyled
        >
          <Dialog.Title>{modalTitle}</Dialog.Title>
          <Dialog.Description>
            Make changessss to your profile here. Click save when done.
          </Dialog.Description>
          {modalContent}
          <Dialog.Close displayWhenAdapted asChild>
            <Button theme="alt1" aria-label="Close" onPress={onSave}>
              Save
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default ModalComponent;
