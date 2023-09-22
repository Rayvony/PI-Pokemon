import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePkmnByName } from "../../redux/actions";
import { useLocation } from "react-router-dom";

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const onClick = () => {
    dispatch(deletePkmnByName(inputValue));
    handleSearch();
  };

  const onChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      onSearch(inputValue);
      setInputValue("");
    }
  };

  if (location.pathname === "/home") {
    return (
      <div className="searchbarContainer">
        <input
          type="text"
          className="searchBar"
          placeholder="Search by name"
          value={inputValue}
          onChange={onChange}
        />
        <button
          onClick={onClick}
          className="material-symbols-outlined botonSearch"
        >
          search
        </button>
      </div>
    );
  }
  return null;
}
