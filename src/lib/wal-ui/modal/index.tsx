import React, { useEffect } from 'react';
import {
  DeepPartial,
  Path,
  PathValue,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
  UseFormReturn,
} from 'react-hook-form';

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ThemingProps,
} from '@chakra-ui/react';
import { IconName } from '@fortawesome/fontawesome-svg-core';

import { Icon } from '@lib/chakra-ui';

function ModalForm<TModel>({
  actionButtonText,
  actionButtonIcon,
  children,
  defaultValue,
  isOpen = false,
  isSubmitting = false,
  model,
  onClose,
  onConfirm,
  size = '6xl',
  title,
}: IProps<TModel>): React.ReactElement {
  const useFormProps = useForm<TModel>({ defaultValues: defaultValue });
  const handleSubmit = useFormProps.handleSubmit(onConfirm);
  const handleClose = () => {
    useFormProps.reset(defaultValue);
    onClose();
  };

  useEffect(() => {
    if (model) {
      (Object.keys(model) as Array<keyof typeof model>).forEach((key): void => {
        const val = model[key as keyof TModel] as UnpackNestedValue<
          PathValue<TModel, Path<TModel>>
        >;
        useFormProps.setValue(key as Path<TModel>, val);
      });
    }
  }, [model]);

  useEffect(() => {
    if (useFormProps.formState.isSubmitSuccessful) {
      useFormProps.reset(defaultValue);
    }
  }, [useFormProps.formState, useFormProps.reset]);

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton onClick={handleClose} />
        <ModalBody>{children && children(useFormProps)}</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="crimson"
            isLoading={isSubmitting || useFormProps.formState.isSubmitting}
            leftIcon={actionButtonIcon && <Icon icon={actionButtonIcon} />}
            mr={3}
            type="submit"
          >
            {actionButtonText}
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

interface IProps<TModel> {
  actionButtonText: string;
  actionButtonIcon?: IconName;
  children(props: UseFormReturn<TModel>): React.ReactElement;
  defaultValue?: UnpackNestedValue<DeepPartial<TModel>>;
  isOpen: boolean;
  isSubmitting: boolean;
  model?: TModel;
  onClose(): void;
  onConfirm: SubmitHandler<TModel>;
  size?: ThemingProps<'Modal'>['size'];
  title: string;
}

export default ModalForm;
export type { IProps as IModalFormProps };