import { useEffect, useState } from "react";
import { Card } from "./Card";
import { PlayAgain } from "./playAgain";
import "./cardList.css";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export const CardList = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [endgame, setEndgame] = useState(false);
  const [counter, setCounter] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const checkSelection = (id) => {
    console.log(selected);
    const includes = selected.includes(id);
    if (!includes && !endgame) {
      setSelected((oldData) => [...oldData, id]);
      if (counter == highScore) {
        setCounter(counter + 1);
        setHighScore(highScore + 1);
      }
      setCounter(counter + 1);
      randomize();
    } else {
      console.log("game Over");
      setEndgame(true);
    }
  };

  const randomize = () => {
    const shuffledData = shuffleArray([...data]);
    setData(shuffledData);
  };

  const handleRestart = () => {
    setCounter(0);
    setEndgame(false);
    setSelected([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const urls = [];
      for (let i = 1; i < 17; i++) {
        urls.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
      }
      const promises = urls.map((u) => fetch(u));
      const responses = await Promise.all(promises);
      const data = await Promise.all(
        responses.map((response) => response.json())
      );
      setData(data);

      // usar lo siguiente estaria mal
      // setData((oldData) => [...oldData, finalData]);
      // porque promise all ya te devuelve un array, y lo que estas haciendo es meter un array adentro de otro array
    };

    fetchData();
    return () => {
      console.log("closing useEf");
      setData([]);
    };
  }, []);

  return (
    <>
      <p><b>Score: {counter}</b></p>

      <p><b>High Score: {highScore}</b></p>

      <div className="container">
        {data.map((item) => {
          return (
            <Card
              imageUrl={`${item.sprites.front_default}`}
              name={item.name}
              key={item.id}
              type={`${item.types[0].type.name}`}
              handleClick={() => checkSelection(item.id)}
            />
          );
        })}
      </div>

      <PlayAgain handleRestart={handleRestart} endgame={endgame} />
    </>
  );
};
