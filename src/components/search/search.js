import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import GiantBombGameSearchStorage from '../../data/giant-bomb-game-search-storage';

function Search(props) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    function sleep(delay = 0) {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    }

    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(2);

            if (active) {
                //TODO: Make request to server to get bunch of GiantBomb data
                let searchResponse = await GiantBombGameSearchStorage.read({
                    resourceName: 'search',
                    searchResource: 'game',
                    queryString: 'Dark Souls'
                });
                console.log('PULANI OF GUAM', searchResponse);
                // setOptions([
                //     {
                //         title: 'Super Smash Bros. Ultimate',
                //         year: 2018
                //     },
                //     {
                //         title: 'Metal Gear Solid 2: Sons of Wolbocho',
                //         year: 2001
                //     }
                // ]);
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
    }, [loading]);

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
                renderOption={(props, option) => {
                    if (open) {
                        return (
                            <div key={option.key}>
                                <img src={option.Icon_Image_URL} />
                                {option.Name}
                            </div>
                        );
                    } else {
                        return (
                            option.Name
                        );
                    }
                }
                }
                options={options}
                loading={loading}
                renderInput={(params) => {
                    console.log('hokookok', params);
                    return (
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
                    );
                }}
            />
        </div>
    );
}

export default Search;