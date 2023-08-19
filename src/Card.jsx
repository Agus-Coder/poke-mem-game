import './card.css'

export const Card = ({name, imageUrl, type, handleClick}) => {
    return(
        <div className="Card" onClick={handleClick}>
            <img src={`${imageUrl}`} alt={`${name}`} />
            <h4>{name}</h4>
            <p>{type}</p>
            {/* <p>{resume}</p> */}
        </div>
    )
}

