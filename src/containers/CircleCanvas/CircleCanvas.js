import React from 'react';
import { Canvas } from '@react-three/fiber';

import CircularSector from 'components/CircularSector';
import { NoToneMapping } from 'three';

const CircleCanvas = ({ data, mainCircleRadius = 1, maxGrade = 10 }) => {
	return (
		<Canvas
			gl={{ antialias: false }}
			onCreated={({ gl }) => {
				gl.toneMapping = NoToneMapping;
				gl.setPixelRatio(window.devicePixelRatio * 2);
				gl.alpha = true;
				gl.antialias = true;
			}}
			camera={{ fov: 30 }}
		>
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
	);
};

export default CircleCanvas;
