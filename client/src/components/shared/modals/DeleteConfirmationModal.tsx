import {ConfirmationModalProps} from '@/interfaces/modals';
import {GeneralModal} from './GeneralModal';

export const DeleteConfirmationModal = ({
  content,
  isOpen,
  setIsOpen,
  width = '280px',
  height = '220px',
  onCancel,
  onDelete,
  isDeleteLoading,
}: ConfirmationModalProps) => {
  return (
    <GeneralModal
      content={content}
      isModalOpen={isOpen}
      setIsModalOpen={setIsOpen}
      width={width}
      height={height}
      buttons={[
        {
          styles: 'p-5 w-1/2',
          handleClick: onCancel,
          title: 'Cancel',
          variant: 'outline',
          loading: false,
        },
        {
          styles: 'hover:bg-accent text-white p-5 w-1/2',
          handleClick: onDelete,
          title: 'Delete',
          variant: 'default',
          loading: isDeleteLoading,
        },
      ]}
    />
  );
};
