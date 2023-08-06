import React, { useEffect, useState } from "react";
import './HomePage.css'

const HomePage = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/getCount?id=1`)
      .then((response) => response.json())
      .then((data) => {
        setCount(data.count);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const onChange = () => {
    fetch("http://localhost:8080/increment")
      .then((response) => response.json())
      .then((data) => {
        setCount(data.count);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container">
      <h1 className="title">Counter</h1>
      <div className="counter">{count}</div>
      <button className="increment-button" onClick={onChange}>
        Increment
      </button>
    </div>
  );
};

export default HomePage;
