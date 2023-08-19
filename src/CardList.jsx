import { useEffect, useState } from "react";
import { Card } from "./Card";
import "./cardList.css";

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array
}

export const CardList = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

  const checkSelection = (id) =>{
    const includes = selected.includes(id)
    if(!includes){
      setSelected(oldData=>[...oldData, id])
      console.log(selected);
      randomize()
    }else{
      console.log("game Over");
    }
  }

  const randomize = () =>{
    const shuffledData = shuffleArray([...data])
    setData(shuffledData)
  }

  useEffect(() => {
    const fetchData = async () => {
      const urls = [];
      for (let i = 1; i < 11; i++) {
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
    <div className="container">
      {data.map((item) => {
        return (
          <Card
            name={item.name}
            key={item.id}
            imageUrl={`${item.sprites.front_default}`}
            type = {`${item.types[0].type.name}`}
            handleClick = {()=>checkSelection(item.id)}
          />
        );
      })}
    </div>
  );
};
