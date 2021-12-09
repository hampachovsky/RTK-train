import React from 'react';
import { useNavigate } from 'react-router';
import { GradientForm } from '../components/Form/GradientForm';

export const New: React.FC = () => {
  const navigate = useNavigate();
  const onAdd = (firstHex: string, secondHex: string) => {
    console.log(firstHex);
    navigate('/');
  };
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Add new gradient</h1>
      <GradientForm submitAction={onAdd} isEditMode={false} />
    </>
  );
};
