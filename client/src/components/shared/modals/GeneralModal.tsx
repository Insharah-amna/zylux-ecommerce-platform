import {Fragment, ReactNode} from 'react';
import {FiLoader} from 'react-icons/fi';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {GeneralModalProps} from '@/interfaces/modals';
import {ButtonProps} from '@/interfaces/buttons';

export const GeneralModal = ({
  title,
  content,
  isModalOpen,
  setIsModalOpen,
  width = 'w-[550px]',
  height = 'h-[550px]',
  buttons,
  buttonsAlignment = 'justify-center',
  titleAlignment = 'text-start',
}: GeneralModalProps) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className={`${width} ${height} px-2 py-0`}>
        <DialogHeader className='overflow-y-auto'>
          {title && (
            <div className='sticky top-0'>
              <DialogTitle className={`bg-white p-5 ${titleAlignment}`}>
                {title}
              </DialogTitle>
            </div>
          )}
          <div className='flex flex-col'>
            {content && (
              <>
                {content.map((contentItem: ReactNode, index: number) => (
                  <Fragment key={'key' + index}>{contentItem}</Fragment>
                ))}
              </>
            )}
          </div>
          {buttons && (
            <div
              className={`flex gap-4 py-2 px-6 w-full items-center ${buttonsAlignment}`}
            >
              {buttons.map((button: ButtonProps) => (
                <Button
                  className={button.styles}
                  onClick={button.handleClick}
                  key={button.title}
                  variant={button.variant}
                >
                  {!button?.loading ? (
                    button.title
                  ) : (
                    <FiLoader
                      className='loader-icon'
                      size={20}
                      color={button.loaderColor}
                    />
                  )}
                </Button>
              ))}
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
