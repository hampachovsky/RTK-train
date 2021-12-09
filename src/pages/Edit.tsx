import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { GradientForm } from '../components/Form/GradientForm';

export const Edit: React.FC = () => {
  let params = useParams();
  const navigate = useNavigate();
  console.log(params.id);
  const onEdit = (firstHex: string, secondHex: string) => {
    console.log(firstHex);
    navigate('/');
  };
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Edit Gradient</h1>
      <GradientForm
        submitAction={onEdit}
        isEditMode={true}
        firstHex='#a85caa'
        secondHex='#8cb8e9'
      />
    </>
  );
};
