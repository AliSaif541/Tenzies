import React from 'react';

export default function Dice(props) {
    const selectedClass = props.resetting ? '' : (props.isSelected ? 'Selected' : '');
  
    return (
      <div onClick={props.handleClick} className={`Dice-face ${selectedClass}`}>
        <h2 className="Dice-num">{props.value}</h2>
      </div>
    );
}