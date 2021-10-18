import React, { useState } from 'react';
import { Circle, Text, QuadraticBezierLine, Line } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

const getGradeRadius = (newGrade, radius, maxGrade) => {
	const newGradeRadius = newGrade * radius / maxGrade;
	return newGradeRadius;
};

const getGrade = (v, radius, maxGrade) => {
	const distance = Math.sqrt(v.x ** 2 + v.y ** 2);
	const newGrade = Math.round(distance * maxGrade / radius);
	return newGrade;
};

const getMiddleAngle = (startAngle, angleLength) => {
	return startAngle + angleLength / 2;
};

const getCategoryTextRotation = (startAngle, angleLength) => {
	const middleAngle = getMiddleAngle(startAngle, angleLength);
	const dir = middleAngle > Math.PI ? 1 : -1;
	return [ 0, 0, dir * Math.PI / 2 + startAngle + angleLength / 2 ];
};

const getCategoryTextPosition = (radius, startAngle, angleLength, textOffset = 1.15) => {
	const middleAngle = getMiddleAngle(startAngle, angleLength);

	return [ textOffset * radius * Math.cos(middleAngle), textOffset * radius * Math.sin(middleAngle), 0 ];
};

const getGradeTextPosition = (newGradeRadius, startAngle, angleLength, radius, grade) => {
	const middleAngle = getMiddleAngle(startAngle, angleLength);
	const dir = middleAngle > Math.PI ? 1 : -1;
	const coef = grade >= 2 ? -radius * 0.1 : radius * 0.1;
	const coefX = dir * coef * Math.cos(middleAngle);
	const coefY = dir * coef * Math.sin(middleAngle);
	return [
		newGradeRadius * Math.cos(middleAngle) + dir * coefX,
		newGradeRadius * Math.sin(middleAngle) + dir * coefY,
		0
	];
};

const getBezierStart = (startAngle, angleLength, radius) => {
	return [ radius * Math.cos(startAngle), radius * Math.sin(startAngle), 0 ];
};

const getBezierMid = (startAngle, angleLength, radius) => {
	const r = radius + radius * 0.01;
	const middleAngle = getMiddleAngle(startAngle, angleLength);
	const newRadius = 2 * r - r * Math.cos(angleLength / 2);

	return [ newRadius * Math.cos(middleAngle), newRadius * Math.sin(middleAngle), 0 ];
};

const getBezierEnd = (startAngle, angleLength, radius) => {
	return [ radius * Math.cos(startAngle + angleLength), radius * Math.sin(startAngle + angleLength), 0 ];
};

const CircularSector = ({ radius, color, maxGrade, dataLen, idx, grade, category }) => {
	const segments = 100;

	const [ newGradeRadius, setNewGradeRadius ] = useState(getGradeRadius(grade, radius, maxGrade));
	const [ gradeHooveringRadius, setGradeHooveringRadius ] = useState(getGradeRadius(grade, radius, maxGrade));

	const [ newGrade, setNewGrade ] = useState(grade);
	const [ newGradeHoovering, setNewGradeHoovering ] = useState(grade);

	const [ hoovering, setHoovering ] = useState(false);

	const pointerMove = (event) => {
		const gradeHoovering = getGrade(event.point, radius, maxGrade);
		const gradeRadiusHoovering = getGradeRadius(gradeHoovering, radius, maxGrade);
		setNewGradeHoovering(gradeHoovering);
		setGradeHooveringRadius(gradeRadiusHoovering);
	};

	const pointerClick = (event) => {
		const gradeHoovering = getGrade(event.point, radius, maxGrade);
		const gradeHooveringRadius = getGradeRadius(gradeHoovering, radius, maxGrade);
		setNewGradeRadius(gradeHooveringRadius);
		setNewGrade(gradeHoovering);
	};

	const angleLength = 2 * Math.PI / dataLen;
	const startAngle = angleLength * idx;

	const props = useSpring({
		scale: hoovering
			? [ gradeHooveringRadius / radius, gradeHooveringRadius / radius, 1 ]
			: [ newGradeRadius / radius, newGradeRadius / radius, 1 ]
	});

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
				<Circle args={[ radius, segments, startAngle, angleLength ]}>
					<meshBasicMaterial attach='material' color={color} opacity={0.6} />
				</Circle>
			</mesh>

			<a.mesh scale={props.scale}>
				<Circle args={[ radius, segments, startAngle, angleLength ]}>
					<meshBasicMaterial attach='material' color={color} />
				</Circle>
				<QuadraticBezierLine
					start={getBezierStart(startAngle, angleLength, radius)} // Starting point
					end={getBezierEnd(startAngle, angleLength, radius)} // Ending point
					mid={getBezierMid(startAngle, angleLength, radius)} // Optional control point
					color='white' // Default
					lineWidth={1} // In pixels (default)
					dashed={false} // Default
				/>
				<Line
					points={[ [ 0, 0, 0 ], getBezierStart(startAngle, angleLength, radius) ]}
					lineWidth={1}
					color='white' // Default
				/>

				<Line
					points={[ [ 0, 0, 0 ], getBezierEnd(startAngle, angleLength, radius) ]}
					lineWidth={1}
					color='white' // Default
				/>
			</a.mesh>

			<Text
				position={getGradeTextPosition(newGradeRadius, startAngle, angleLength, radius, newGrade)}
				rotation={getCategoryTextRotation(startAngle, angleLength)}
				color='black'
			>
				{hoovering ? newGradeHoovering :newGrade}
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
