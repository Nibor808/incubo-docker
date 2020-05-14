import React from "react";
import PortfolioItem from "./portfolio_item";

export default props => {
  const { handleClick, year, list, listClass } = props;
  const klass = `col-sm-2 col-md-1 ${listClass}`;

  return (
    <div className="row">
      <div className={klass}>
        <p>{year}</p>
      </div>

      <div className="col-sm-10 col-md-11 portfolio-items">
        {list.map((item, index) => (
          <PortfolioItem
            key={`portfolio-item-${index}`}
            item={item}
            index={index}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};
