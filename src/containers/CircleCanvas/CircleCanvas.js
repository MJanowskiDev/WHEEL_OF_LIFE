import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import CircularSector from 'components/CircularSector';

const CircleCanvas = ({ data, mainCircleRadius = 1, maxGrade = 10 }) => {
	const [ pixelRatio, setPixelRatio ] = useState(1);

	useEffect(() => {
		const updatePixelRatio = () => {
			let pr = window.devicePixelRatio;
			matchMedia(`(resolution: ${pr}dppx)`).addEventListener('change', updatePixelRatio, { once: true });
			setPixelRatio(pr);
		};

		updatePixelRatio();
	}, []);

	return (
		<Canvas
			style={{ width: '50vh', height: '50vh', userSelect: 'none' }}
			dpr={pixelRatio * 4}
			flat
			onCreated={({ gl }) => {
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
