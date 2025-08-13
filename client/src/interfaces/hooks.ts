export interface SideContentExpandHookProps {
  open: boolean;
  delay?: number;
}

export interface PaginationHookProps {
  serverSideComputedTotalPages?: number;
  data?: any;
  queryOptions: QueryParams;
}

export interface ServerSideListFilterHookProps {
  limit?: number;
  queryToCall: any;
  queryKey: string;
  queryOptions: QueryParams;
}

interface SearchQueryOptions {
  search?: string;
  searchKeys?: string[];
}

interface PageQueryOptions {
  page: number;
  limit: number;
}

export interface FilterQueryParams {
  isOutOfStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
  category?: string[];
}

interface QueryParams {
  searchOptions?: SearchQueryOptions;
  pageOptions: PageQueryOptions;
  filters?: FilterQueryParams;
}

export interface ClientSideFilterListHookProps {
  selector: any;
  queryOptions: QueryParams;
}

export interface SearchHookProps {
  data?: any;
  queryOptions: QueryParams;
}

export interface FilterHookProps {
  queryOptions: QueryParams;
}
