import React from 'react';
import { Link } from 'react-router-dom';
import style from './GradientCard.module.css';

type PropsType = {
  id: number;
  firstHex: string;
  secondHex: string;
};

export const GradientCard: React.FC<PropsType> = ({ id, firstHex, secondHex }) => {
  return (
    <div
      className={style.card}
      style={{ background: `linear-gradient(to right, ${firstHex}, ${secondHex})` }}
    >
      <p className={style.cardDelete}>
        <button className={style.deleteBtn}>&#10005;</button>
      </p>
      <div className={style.cardTitle}>
        <h1>{firstHex}</h1>
        <h1>{secondHex}</h1>
      </div>
      <h2 className={style.cardEdit}>
        <Link className={style.cardLink} to={`edit/${id}`}>
          Edit
        </Link>
      </h2>
    </div>
  );
};
