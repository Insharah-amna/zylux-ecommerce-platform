import {FilterQueryParams} from '@/interfaces/hooks';

export type QueryParams = {
  search: string | undefined;
  filters?: FilterQueryParams | null;
};
