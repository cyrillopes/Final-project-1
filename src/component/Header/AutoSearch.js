import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const url = "https://poke-us.herokuapp.com/mealtype";

function AutoSearch() {
  const [mealType, setMealType] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const loadResults = async () => {
      const response = await axios.get(url);
      setMealType(response.data);
    };
    loadResults();
  }, []);

  const onchangeHandler = (text) => {
    let matches = [];
    if (text.length) {
      matches = mealType.filter((user) => {
        const regex = new RegExp(`${text}`, "gi");
        return user.mealtype.match(regex);
      });
    }
    setSuggestions(matches);
    setText(text);
  };
  return (
    <>
      <div className="input-group input-group-lg search-restaurant m-0">
        <input
          onChange={(e) => onchangeHandler(e.target.value)}
          value={text}
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          placeholder="Enter Search"
        />
      </div>
      {suggestions &&
        suggestions.map((suggestions, i) => {
          return (
            <div className="col-5 position-absolute search-items-list">
              <div class="card bg-light">
                <div class="card-body">
                  <Link
                    onClick={() => {
                      window.location.href = `/listing/${suggestions.mealtype_id}`;
                    }}
                    key={suggestions.mealtype_id}
                    className="col-lg-12 bg-light zz search-results px-4 text-dark "
                    to={`/listing/${suggestions.mealtype_id}`}
                  >
                    {suggestions.mealtype}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
export default AutoSearch;
