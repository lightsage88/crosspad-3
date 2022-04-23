import React from 'react';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function GameInfo(props) {
    console.log('gameInfo Component running here are props: ', props);
    let altText = `${props?.game?.Name} Box Art`;
    return (
        <div id="game-info-div">
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => props.toggleGameBoxArtDisplayShown()}>
                    <CardMedia
                        component="img"
                        height="270"
                        image={props?.game?.Screen_Image_URL}
                        alt={altText}
                    />
                </CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props?.game?.Name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props?.game?.Deck}
                    </Typography>
                    <div id="game-info-review-div">
                        <Typography variant="body2">
                            Review Score: --make request to GiantBomb's other api to get review score data--
                        </Typography>
                    </div>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default GameInfo;