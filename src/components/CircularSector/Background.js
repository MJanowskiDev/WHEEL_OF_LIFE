import { Circle } from '@react-three/drei';

const Background = ({ args, color, opacity = 0.6 }) => {
	return (
		<Circle args={args}>
			<meshBasicMaterial attach="material" color={color} opacity={opacity} />
		</Circle>
	);
};

export default Background;
