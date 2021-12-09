import React from 'react';
import { GradientCard } from '../components/GradientCard';

export const Home: React.FC = () => {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Your gradient list</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
          flexWrap: 'wrap',
        }}
      >
        <GradientCard id={1} firstHex='#a85caa' secondHex='#8cb8e9' />
        <GradientCard id={2} firstHex='#a85caa' secondHex='#8cb8e9' />
        <GradientCard id={3} firstHex='#a85caa' secondHex='#8cb8e9' />
        <GradientCard id={4} firstHex='#a85caa' secondHex='#8cb8e9' />
        <GradientCard id={5} firstHex='#8fffff' secondHex='#acb8e9' />
      </div>
    </>
  );
};
