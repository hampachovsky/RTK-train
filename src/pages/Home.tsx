import React from 'react';
import { GradientCard } from '../components/GradientCard';
import { useAppSelector } from '../hooks/redux';

export const Home: React.FC = () => {
  const gradients = useAppSelector((state) => state.gradientReducer.gradients);
  return (
    <>
      <h1 data-testid='home-page' style={{ textAlign: 'center' }}>
        Your gradient list
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
          flexWrap: 'wrap',
        }}
      >
        {gradients.map((it) => {
          return (
            <GradientCard key={it.id} id={it.id} firstHex={it.firstHex} secondHex={it.secondHex} />
          );
        })}
      </div>
    </>
  );
};
