import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import GiantBombGameSearchStorage from '../../data/giant-bomb-game-search-storage';

function Search(props) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [queryString, setQueryString] = useState('');
    const loading = open && options.length === 0;

    function sleep(delay = 0) {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    }

    function handleSearchInputChange(e) {
        console.log('handleSearchInputChange running...', e.target.value);
        setOptions([]);
        setQueryString(e.target.value);
    }

    useEffect(() => {
        console.log('useEffect running...');
        let active = true;
        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1500);

            if (active) {
                console.log('active is true');
                //TODO: Make request to server to get bunch of GiantBomb data
                let searchResponse = await GiantBombGameSearchStorage.read({
                    resourceName: 'search',
                    searchResource: 'game',
                    queryString
                });
                console.log('PULANI OF GUAM', searchResponse);
                searchResponse.data = searchResponse.data.map((el, index) => {
                    el.key = index;
                    return el;
                });
                setOptions(searchResponse.data);
            }
        })();
        console.log('Search component useEffect going');

        return () => {
            active = false;
        };
    }, [queryString]);

    return (
        <div id="search-div">
            <Autocomplete
                filterOptions={x => x}
                id="search-autocomplete"
                sx={{ width: 300 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => option.Name === value.Name}
                getOptionLabel={(option) => option?.Name}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Seek a Game"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                        onChange={(e) => handleSearchInputChange(e)}
                    />
                )
                }
            />
        </div>
    );
}

export default Search;