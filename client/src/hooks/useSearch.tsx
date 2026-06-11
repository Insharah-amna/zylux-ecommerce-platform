import {useState} from 'react';
import {SearchHookProps} from '@/interfaces/hooks';

export const useSearch = ({data = [], queryOptions}: SearchHookProps) => {
  const [search, setSearch] = useState(queryOptions?.searchOptions?.search);
  const [committedSearch, setCommittedSearch] = useState<string | undefined>(
    ''
  );
  const [searchedData, setSearchedData] = useState([]);

  const handleSearch = () => {
    setCommittedSearch(search);

    if (!data || data.length === 0) return;
    if (!search) {
      setSearchedData(data);
      return;
    }

    const searchKeys = queryOptions?.searchOptions?.searchKeys || [];

    const filtered = data.filter((item: Record<string, any>) =>
      searchKeys.some((key) => {
        const value = item[key];
        return value?.toString().toLowerCase().includes(search.toLowerCase());
      })
    );

    setSearchedData(filtered);
  };

  const resetSearchedData = () => {
    setSearchedData(data);
  };

  return {
    search,
    setSearch,
    searchedData: searchedData.length > 0 ? searchedData : data,
    handleSearch,
    resetSearchedData,
    committedSearch,
    setCommittedSearch,
  };
};
