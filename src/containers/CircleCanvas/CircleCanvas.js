import React from 'react';
import { Canvas } from '@react-three/fiber';

import CircularSector from '../../components/CircularSector/CircularSector';

const mainCircleRadius = 1;
const maxGrade = 10;

const data = [
  {
    category: 'Carrer',
    grade: '5',
    color: '#59F316',
  },
  {
    category: 'Environment',
    grade: '8',
    color: '#EF767A',
  },
  {
    category: 'Life Purpose',
    grade: '7',
    color: '#7D7ABC',
  },
  {
    category: 'Nutrition',
    grade: '4',
    color: '#3a86ff',
  },
  {
    category: 'Self Esteem',
    grade: '1',
    color: '#FFE347',
  },
];

export const CircleCanvas = () => {
  return (
    <>
      <Canvas camera={{ fov: 30 }}>
        {data.map((element, idx) => {
          return (
            <CircularSector
              key={`CircularSector${idx}`}
              idx={idx}
              radius={mainCircleRadius}
              grade={element.grade}
              color={element.color}
              dataLen={data.length}
              maxGrade={maxGrade}
              category={element.category}
            />
          );
        })}
      </Canvas>
    </>
  );
};
