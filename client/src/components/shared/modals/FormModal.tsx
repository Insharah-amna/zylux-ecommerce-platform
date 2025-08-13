import {GeneralModal} from './GeneralModal';
import {FormModalProps} from '@/interfaces/modals';

export const FormModal = ({
  title,
  content,
  isFormOpen,
  setIsFormOpen,
}: FormModalProps) => {
  return (
    <>
      <GeneralModal
        title={title}
        content={content}
        isModalOpen={isFormOpen}
        setIsModalOpen={setIsFormOpen}
      />
    </>
  );
};
