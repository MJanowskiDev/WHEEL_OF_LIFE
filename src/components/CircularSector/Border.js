import { QuadraticBezierLine, Line } from '@react-three/drei';
import { getBezierStart, getBezierEnd, getBezierMid } from './utils';
import { colors } from './theme';

const Border = ({ startAngle, angleLength, radius, color = colors.active, lineWidth = 1 }) => {
	return (
		<mesh>
			<QuadraticBezierLine
				start={getBezierStart(startAngle, angleLength, radius)}
				end={getBezierEnd(startAngle, angleLength, radius)}
				mid={getBezierMid(startAngle, angleLength, radius)}
				color={color}
				lineWidth={lineWidth}
			/>
			<Line points={[ [ 0, 0, 0 ], getBezierStart(startAngle, angleLength, radius) ]} lineWidth={lineWidth} color={color} />

			<Line points={[ [ 0, 0, 0 ], getBezierEnd(startAngle, angleLength, radius) ]} lineWidth={lineWidth} color={color} />
		</mesh>
	);
};

export default Border;
