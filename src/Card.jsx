import './card.css'

export const Card = ({name, imageUrl, type, handleClick}) => {
    return(
        <div className="Card" onClick={handleClick}>
            <h4>{name}</h4>
            <p>{type}</p>
            <img src={`${imageUrl}`} alt={`${name}`} />
            {/* <p>{resume}</p> */}
        </div>
    )
}

