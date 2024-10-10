import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { gets } from '@logic/gets';
import { useDispatch } from 'react-redux';
import { addMoviesSearch, setFlag } from 'src/store/slices';

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  padding-right: 10%;
  border-radius: 2rem;
  border: 1.5px solid transparent;
  background: none;
  outline: none;
  color: var(--palette1);
  font-size: 0.8rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: border 0.3s ease;

  &:focus {
    border: 1.5px solid var(--palette3);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  z-index: 2;
  right: 0.5rem;

  svg {
    color: var(--palette3);
    cursor: pointer;
  }
`;

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

interface SearchProps {
    setLoading: (isLoading: boolean) => void;
}

const Search = ({ setLoading }: SearchProps) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const { data, error, isLoading } = useQuery(
        ['busqueda', debouncedSearchTerm],
        () => gets.getSearch({ query: debouncedSearchTerm }),
        {
            enabled: !!debouncedSearchTerm,
            cacheTime: 0,
            staleTime: 0,
        }
    );

    useEffect(() => {
        if (data) {
            dispatch(addMoviesSearch(data.results));
        }
    }, [data, dispatch]);

    useEffect(() => {
        if (debouncedSearchTerm.length === 0) {
            dispatch(setFlag(false))
            dispatch(addMoviesSearch([]))
        } else {
            dispatch(setFlag(true))
        }
    }, [debouncedSearchTerm])

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <SearchContainer>
            <SearchInput
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Buscar..."
            />
            <IconWrapper>
                <SearchIcon />
            </IconWrapper>
        </SearchContainer>
    );
};

export default Search;
