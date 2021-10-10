import React, { useState } from 'react';
import { Circle, Text } from '@react-three/drei';

const getGradeRadius = (newGrade, radius, maxGrade) => {
  const newGradeRadius = (newGrade * radius) / maxGrade;
  return newGradeRadius;
};

const getGrade = (v, radius, maxGrade) => {
  const distance = Math.sqrt(v.x ** 2 + v.y ** 2);
  const newGrade = Math.round((distance * maxGrade) / radius);
  return newGrade;
};

const getCategoryTextRotation = (startAngle, angleLength) => {
  const middleAngle = startAngle + angleLength / 2;
  const dir = middleAngle > Math.PI ? 1 : -1;
  return [0, 0, (dir * Math.PI) / 2 + startAngle + angleLength / 2];
};

const getCategoryTextPosition = (radius, startAngle, angleLength) => {
  const middleAngle = startAngle + angleLength / 2;

  return [
    1.15 * radius * Math.cos(middleAngle),
    1.15 * radius * Math.sin(middleAngle),
    0,
  ];
};

const getGradeTextPosition = (
  newGradeRadius,
  startAngle,
  angleLength,
  radius,
  grade
) => {
  const middleAngle = startAngle + angleLength / 2;
  const dir = middleAngle > Math.PI ? 1 : -1;
  const coef = grade >= 2 ? -radius * 0.1 : radius * 0.1;
  const coefX = dir * coef * Math.cos(middleAngle);
  const coefY = dir * coef * Math.sin(middleAngle);
  return [
    newGradeRadius * Math.cos(middleAngle) + dir * coefX,
    newGradeRadius * Math.sin(middleAngle) + dir * coefY,
    0,
  ];
};

const CircularSector = ({
  radius,
  color,
  maxGrade,
  dataLen,
  idx,
  grade,
  category,
}) => {
  const segments = 20;

  const [newGradeRadius, setNewGradeRadius] = useState(
    getGradeRadius(grade, radius, maxGrade)
  );
  const [gradeHooveringRadius, setGradeHooveringRadius] = useState(
    getGradeRadius(grade, radius, maxGrade)
  );

  const [newGrade, setNewGrade] = useState(grade);
  const [newGradeHoovering, setNewGradeHoovering] = useState(grade);

  const [hoovering, setHoovering] = useState(false);

  const pointerMove = (event) => {
    const gradeHoovering = getGrade(event.point, radius, maxGrade);

    const gradeRadiusHoovering = getGradeRadius(
      gradeHoovering,
      radius,
      maxGrade
    );

    setNewGradeHoovering(gradeHoovering);
    setGradeHooveringRadius(gradeRadiusHoovering);
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
          setHoovering(true);
        }}
        onPointerLeave={() => {
          setHoovering(false);
        }}
      >
        <Circle args={[radius, segments, startAngle, angleLength]}>
          <meshBasicMaterial attach='material' color={color} opacity={0.7} />
        </Circle>
      </mesh>

      <mesh>
        <Circle
          args={[
            hoovering ? gradeHooveringRadius : newGradeRadius,
            segments,
            startAngle,
            angleLength,
          ]}
        >
          <meshBasicMaterial attach='material' color={color} />
        </Circle>
      </mesh>

      <Text
        position={getGradeTextPosition(
          newGradeRadius,
          startAngle,
          angleLength,
          radius,
          newGrade
        )}
        rotation={getCategoryTextRotation(startAngle, angleLength)}
        color='black'
      >
        {newGrade}
      </Text>

      <Text
        position={getCategoryTextPosition(radius, startAngle, angleLength)}
        rotation={getCategoryTextRotation(startAngle, angleLength)}
        color='black'
      >
        {category}
      </Text>
    </group>
  );
};

export default CircularSector;
