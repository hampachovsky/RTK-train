import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { GradientForm } from '../components/Form/GradientForm';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { gradientSlice, selectGradient } from '../store/slices/GradientSlice';

export const Edit: React.FC = () => {
  let params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { editItem } = gradientSlice.actions;
  const tempType = params.id as string;
  const id = +tempType;
  const gradient = useAppSelector((state) => selectGradient(state, id));

  const onEdit = (firstHex: string, secondHex: string) => {
    dispatch(editItem({ id, firstHex, secondHex }));
    navigate('/');
  };
  return (
    <>
      <h1 data-testid='edit-page' style={{ textAlign: 'center' }}>
        Edit Gradient
      </h1>
      <GradientForm
        submitAction={onEdit}
        isEditMode={true}
        firstHex={gradient.firstHex}
        secondHex={gradient.secondHex}
      />
    </>
  );
};
