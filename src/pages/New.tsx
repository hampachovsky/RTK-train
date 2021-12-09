import React from 'react';
import { useNavigate } from 'react-router';
import { GradientForm } from '../components/Form/GradientForm';
import { useAppDispatch } from '../hooks/redux';
import { gradientSlice } from '../store/slices/GradientSlice';

export const New: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { addItem } = gradientSlice.actions;
  const onAdd = (firstHex: string, secondHex: string) => {
    const id = Date.now();
    dispatch(addItem({ id, firstHex, secondHex }));
    navigate('/');
  };
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Add new gradient</h1>
      <GradientForm submitAction={onAdd} isEditMode={false} />
    </>
  );
};
