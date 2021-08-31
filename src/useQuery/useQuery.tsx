import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const getSearchParams = ({ searchTerm = '', allowMultiple = false } = {}) => {
    const queryParams: any = new URLSearchParams(searchTerm);
    const queryParamsKeys: Set<string> = new Set(queryParams.keys());

    for (let searchKey of queryParamsKeys) {
        queryParams[searchKey] = (allowMultiple ? queryParams.getAll(searchKey) : queryParams.get(searchKey)) as any;
    }

    return queryParams;
};

const useQuery = ({ searchTerm = useLocation().search, allowMultiple = false } = {}) => {
    let [queryParam, setQueryParam] = useState(getSearchParams({ searchTerm, allowMultiple }));

    useEffect(() => {
        setQueryParam(getSearchParams({ searchTerm, allowMultiple }));
    }, [searchTerm, allowMultiple]);

    return queryParam;
};

export default useQuery;
