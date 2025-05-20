import './App.css'
import {useCallback, useEffect, useState} from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
    { "src": "/img/helmet-1.png", "matched": false},
    { "src": "/img/potion-1.png", "matched": false},
    { "src": "/img/ring-1.png", "matched": false},
    { "src": "/img/scroll-1.png", "matched": false},
    { "src": "/img/shield-1.png", "matched": false},
    { "src": "/img/sword-1.png" , "matched": false},
    { "src": "/img/bow.png" , "matched": false},
    { "src": "/img/book.png" , "matched": false}
]

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);


    //shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(()=> Math.random()-0.5)
            .map((item)=>({...item, id: Math.random()}));

        setCards(shuffledCards);
        resetTurn()
        setTurns(0);
    }

    const handleChoice = (card)=>{
        if(!choiceOne){
            setChoiceOne(card)
        }else{
            setChoiceTwo(card)

        }
    }

    const resetTurn = useCallback(()=>{
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
    }, []);

    useEffect(() => {
        if (choiceOne && choiceTwo) {

            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card=>{
                        return card.src === choiceOne.src ? {...card, matched: true} : card
                    })
                });
                resetTurn()
            } else {
                setDisabled(true)

               setTimeout(() => {
                   resetTurn()
                   setDisabled(false)
                }, 700)
            }
        }
    }, [choiceOne, choiceTwo, resetTurn, turns])


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

        <h2>Turns: {turns}</h2>

        <div className="card-grid">
            {cards.map((card) => (
                <SingleCard
                    card={card}
                    key = {card.id}
                    handleChoice={handleChoice}
                    flipped = {card===choiceOne||card===choiceTwo||card.matched}
                    disabled={disabled}
                />
            ))}
        </div>
    </div>
  );
}

export default App