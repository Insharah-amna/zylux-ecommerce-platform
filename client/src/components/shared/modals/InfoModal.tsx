import {GeneralModal} from './GeneralModal';
import {InfoModalProps} from '@/interfaces/modals';

export const InfoModal = ({
  title,
  content,
  isInfoOpen,
  setIsInfoOpen,
}: InfoModalProps) => {
  return (
    <GeneralModal
      title={title}
      content={content}
      isModalOpen={isInfoOpen}
      setIsModalOpen={setIsInfoOpen}
    />
  );
};
