import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { filter, order, filterType, orderAtk } from "../../redux/actions";

export default function Filters() {
  const location = useLocation();
  const dispatch = useDispatch();

  const pkmnTypes = useSelector((state) => state.pkmnTypes);

  const handleFilter = (event) => {
    dispatch(filter(event.target.value));
  };

  const handleTypeFilter = (event) => {
    dispatch(filterType(event.target.value));
  };

  const handleOrder = (event) => {
    dispatch(order(event.target.value));
  };

  const handleATKOrder = (event) => {
    dispatch(orderAtk(event.target.value));
  };

  if (location.pathname === "/home") {
    return (
      <div className="filtersContainer">
        <p>Filtrar:</p>
        <select
          className="filterSelect"
          name="filter"
          onChange={handleTypeFilter}
          defaultValue={"Todos"}
        >
          <option value="Todos">Tipo</option>
          {pkmnTypes?.map((type) => (
            <option key={type.id} value={type.id}>
              {" "}
              {type.name}{" "}
            </option>
          ))}
        </select>
        <select
          className="filterSelect"
          name="filter"
          onChange={handleFilter}
          defaultValue={"Todos"}
        >
          <option value="Todos">Todos</option>
          <option value="false">Oficiales</option>
          <option value="true">Creados</option>
        </select>
        <select
          className="filterSelect"
          name="order"
          onChange={handleOrder}
          defaultValue={"A"}
        >
          <option value="" disabled="disabled">
            Orden?
          </option>

          <option value="none"> - </option>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
        </select>
        <select
          className="filterSelect"
          name="orderAtk"
          onChange={handleATKOrder}
          defaultValue={"A"}
        >
          <option value="" disabled="disabled">
            Ataque?
          </option>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
        </select>
      </div>
    );
  }
  return null;
}
