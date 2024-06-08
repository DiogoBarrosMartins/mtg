import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardMedia, Link as MuiLink } from '@mui/material';
import { getCardsByString } from '../../services/card-service';
import { useNavigate } from 'react-router-dom';

const CardListDisplay = ({ searchInput }) => {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCards(searchInput);
    }, [searchInput]);

    const fetchCards = async (input) => {
        try {
            const fetchedCards = await getCardsByString(input);
            setCards(fetchedCards);
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    const handleCardClick = (cardName) => {
        navigate(`/card?name=${encodeURIComponent(cardName)}`);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '20px',
        }}>
            {cards.map(card => (
                <MuiLink 
                    key={card.id} 
                    component="button"
                    onClick={() => handleCardClick(card.name)} 
                    sx={{ textDecoration: 'none' }}
                >
                    <Card sx={{ width: 200, cursor: 'pointer' }}>
                        <CardMedia
                            component="img"
                            image={card.card}
                            alt={card.name}
                            sx={{ height: "100%", borderRadius: "25px" }}
                        />
                    </Card>
                </MuiLink>
            ))}
        </Box>
    );
};

CardListDisplay.propTypes = {
    searchInput: PropTypes.string.isRequired,
};

export default CardListDisplay;
