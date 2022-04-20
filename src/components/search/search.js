import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress'
import { GiantBombGameSearchStorage } from '../../data/giant-bomb-game-search-storage';

function Search(props) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3);

            if (active) {
                //TODO: Make request to server to get bunch of GiantBomb data
                setOptions([
                    {
                        title: 'Super Smash Bros. Ultimate',
                        year: 2018
                    },
                    {
                        title: 'Metal Gear Solid 2: Sons of Wolbocho',
                        year: 2001
                    }
                ])
            }
        })
        console.log('Search component useEffect going');
    });

    return (
        <div id="search-div">
            <Autocomplete
                id="search-autocomplete"
                sx={{ width: 300 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false)
                }}
                isOptionEqualToValue={(option, value) => option.title === value.title}
                getOptionLabel={(option) => option.title}
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
                    />
                )}
            />
        </div>
    )
}

export default Search;