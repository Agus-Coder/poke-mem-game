export const PlayAgain = ({ handleRestart, endgame }) => {
  return endgame ? <button onClick={handleRestart}>Play Again</button> : <></>;
};