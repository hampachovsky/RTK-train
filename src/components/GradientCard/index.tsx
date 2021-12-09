import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { IGradient } from '../../models/IGradient';
import { gradientSlice } from '../../store/slices/GradientSlice';
import style from './GradientCard.module.css';

type PropsType = IGradient;

export const GradientCard: React.FC<PropsType> = ({ id, firstHex, secondHex }) => {
  const dispatch = useAppDispatch();
  const { deleteItem } = gradientSlice.actions;
  return (
    <div
      className={style.card}
      style={{ background: `linear-gradient(to right, ${firstHex}, ${secondHex})` }}
    >
      <p className={style.cardDelete}>
        <button
          onClick={() => {
            dispatch(deleteItem(id));
          }}
          className={style.deleteBtn}
        >
          &#10005;
        </button>
      </p>
      <div className={style.cardTitle}>
        <h2>{firstHex}</h2>
        <h2>{secondHex}</h2>
      </div>
      <h2 className={style.cardEdit}>
        <Link className={style.cardLink} to={`edit/${id}`}>
          Edit
        </Link>
      </h2>
    </div>
  );
};
