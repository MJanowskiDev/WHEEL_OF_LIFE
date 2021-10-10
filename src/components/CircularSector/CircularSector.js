import React, { useState } from 'react';
import { Circle, Text } from '@react-three/drei';

const CircularSector = ({ radius, color, maxGrade, dataLen, idx, grade }) => {
  const segments = 20;

  const [newGradeRadius, setNewGradeRadius] = useState(
    (grade * radius) / maxGrade
  );
  const [gradeHooveringRadius, setGradeHooveringRadius] = useState(
    (grade * radius) / maxGrade
  );

  const [newGrade, setNewGrade] = useState(grade);
  const [newGradeHoovering, setNewGradeHoovering] = useState(grade);

  const [pointer, setPointer] = useState(false);

  const calculateNewGradeRadius = (v) => {
    const distance = Math.sqrt(v.x ** 2 + v.y ** 2);
    const newGrade = Math.round((distance * maxGrade) / radius);
    setNewGradeHoovering(newGrade);
    const newGradeRadius = (newGrade * radius) / maxGrade;
    return newGradeRadius;
  };

  const pointerMove = (event) => {
    setGradeHooveringRadius(calculateNewGradeRadius(event.point));
  };

  const pointerClick = () => {
    setNewGradeRadius(gradeHooveringRadius);
    setNewGrade(newGradeHoovering);
  };

  const angleLength = (2 * Math.PI) / dataLen;
  const startAngle = angleLength * idx;

  return (
    <group>
      <mesh
        onPointerMove={pointerMove}
        onClick={pointerClick}
        onPointerEnter={() => {
          setPointer(true);
        }}
        onPointerLeave={() => {
          setPointer(false);
        }}
      >
        <Circle args={[radius, segments, startAngle, angleLength]}>
          <meshBasicMaterial attach='material' color={color} opacity={0.5} />
        </Circle>
      </mesh>

      <mesh>
        <Circle
          args={[
            pointer ? gradeHooveringRadius : newGradeRadius,
            segments,
            startAngle,
            angleLength,
          ]}
        >
          <meshBasicMaterial attach='material' color={color} />
        </Circle>
      </mesh>

      <Text
        position={[
          (radius / 2) * Math.cos(startAngle + 0.5 * angleLength) - 0.1,
          (Math.sin(startAngle + 0.5 * angleLength) * radius) / 2,
          0,
        ]}
        color='black'
        anchorX='center'
        anchorY='middle'
      >
        {newGrade}
      </Text>
    </group>
  );
};

export default CircularSector;
