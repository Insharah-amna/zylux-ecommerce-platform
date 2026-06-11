import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {ProductProps} from '@/interfaces/products';

const ProductDescription = ({product}: ProductProps) => {
  return (
    <Accordion
      type='single'
      collapsible
      className='w-[90%]'
      defaultValue='description'
    >
      <AccordionItem value='description'>
        <AccordionTrigger className='text-lg font-semibold'>
          Description
        </AccordionTrigger>
        <AccordionContent className='flex flex-col gap-4 text-balance'>
          <p>{product.description}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductDescription;
