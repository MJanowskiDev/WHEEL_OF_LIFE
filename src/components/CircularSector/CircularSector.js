import React, { useState } from 'react';
import { Text } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

import Background from './Background';
import Border from './Border';
import Sector from './Sector';

import {
	getGradeTextPosition,
	getGradeRadius,
	getGrade,
	getCategoryTextRotation,
	getCategoryTextPosition,
	getScale,
	arcSegments
} from './utils';

import { colors } from './theme';

const CircularSector = ({ radius, color, maxGrade, dataLen, idx, grade, category, segments = arcSegments }) => {
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
		setHoovering(true);
	};

	const pointerClick = (event) => {
		const gradeHoovering = getGrade(event.point, radius, maxGrade);
		const gradeHooveringRadius = getGradeRadius(gradeHoovering, radius, maxGrade);
		setNewGradeRadius(gradeHooveringRadius);
		setNewGrade(gradeHoovering);
		setNewGradeHoovering(gradeHoovering);
		setGradeHooveringRadius(gradeHooveringRadius);
		setHoovering(false);
	};

	const pointerEnterHandle = () => {
		setHoovering(true);
	};

	const pointerLeaveHandle = () => {
		setHoovering(false);
	};

	const angleLength = 2 * Math.PI / dataLen;
	const startAngle = angleLength * idx;

	const props = useSpring({
		scale: hoovering
			? [ getScale(gradeHooveringRadius, radius), getScale(gradeHooveringRadius, radius), 1 ]
			: [ newGradeRadius / radius, newGradeRadius / radius, 1 ],
		position: hoovering
			? getGradeTextPosition(gradeHooveringRadius, startAngle, angleLength, radius, newGradeHoovering)
			: getGradeTextPosition(newGradeRadius, startAngle, angleLength, radius, newGrade)
	});

	return (
		<group>
			<mesh
				onPointerMove={pointerMove}
				onClick={pointerClick}
				onPointerEnter={pointerEnterHandle}
				onPointerLeave={pointerLeaveHandle}
			>
				<Background color={color} opacity={0.6} args={[ radius, segments, startAngle, angleLength ]} />
			</mesh>

			<a.mesh scale={props.scale}>
				<Sector args={[ radius, segments, startAngle, angleLength ]} color={color} opacity={1} />
				<Border startAngle={startAngle} angleLength={angleLength} radius={radius} />
			</a.mesh>

			<a.mesh position={props.position}>
				<Text
					rotation={getCategoryTextRotation(startAngle, angleLength)}
					color={!hoovering || newGradeHoovering === newGrade ? colors.default : colors.active}
				>
					{hoovering ? newGradeHoovering : newGrade}
				</Text>
			</a.mesh>

			<Text
				position={getCategoryTextPosition(radius, startAngle, angleLength)}
				rotation={getCategoryTextRotation(startAngle, angleLength)}
				color={colors.default}
			>
				{category}
			</Text>
		</group>
	);
};

export default CircularSector;
