import { Circle } from '@react-three/drei';
const Sector = ({ args, color, opacity = 1 }) => {
	return (
		<Circle args={args} color={color} opacity={opacity}>
			<meshBasicMaterial attach="material" color={color} />
		</Circle>
	);
};

export default Sector;
