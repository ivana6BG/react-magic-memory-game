import "./SingleCard.css"

export default function SingleCard({card, handleChoice, flipped, disabled}) {


    const handleClick = (e) => {
        if(!disabled){
            handleChoice(card)
        }
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img
                    className="front"
                    src={card.src}
                    alt={card.src}/>
                <img
                    className="back"
                    src="/img/cover.png"
                    alt="back card"
                    onClick={handleClick}
                />

            </div>
        </div>
    )
}