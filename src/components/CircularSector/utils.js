export const getGradeRadius = (newGrade, radius, maxGrade) => {
	const newGradeRadius = newGrade * radius / maxGrade;
	return newGradeRadius;
};

export const getGrade = (v, radius, maxGrade) => {
	const distance = Math.sqrt(v.x ** 2 + v.y ** 2);
	const newGrade = Math.round(distance * maxGrade / radius);
	return newGrade;
};

export const getMiddleAngle = (startAngle, angleLength) => {
	return startAngle + angleLength / 2;
};

export const getCategoryTextRotation = (startAngle, angleLength) => {
	const middleAngle = getMiddleAngle(startAngle, angleLength);
	const dir = middleAngle > Math.PI ? 1 : -1;
	return [ 0, 0, dir * Math.PI / 2 + startAngle + angleLength / 2 ];
};

export const getCategoryTextPosition = (radius, startAngle, angleLength, textOffset = 1.15) => {
	const middleAngle = getMiddleAngle(startAngle, angleLength);

	return [ textOffset * radius * Math.cos(middleAngle), textOffset * radius * Math.sin(middleAngle), 0 ];
};

export const getGradeTextPosition = (newGradeRadius, startAngle, angleLength, radius, grade) => {
	const middleAngle = getMiddleAngle(startAngle, angleLength);
	const dir = middleAngle > Math.PI ? 1 : -1;
	const coef = grade >= 2 ? -radius * 0.1 : radius * 0.1;
	const coefX = dir * coef * Math.cos(middleAngle);
	const coefY = dir * coef * Math.sin(middleAngle);
	return [ newGradeRadius * Math.cos(middleAngle) + dir * coefX, newGradeRadius * Math.sin(middleAngle) + dir * coefY, 0 ];
};

export const getBezierStart = (startAngle, angleLength, radius) => {
	return [ radius * Math.cos(startAngle), radius * Math.sin(startAngle), 0 ];
};

export const getBezierMid = (startAngle, angleLength, radius) => {
	const r = radius + radius * 0.01;
	const middleAngle = getMiddleAngle(startAngle, angleLength);
	const newRadius = 2 * r - r * Math.cos(angleLength / 2);

	return [ newRadius * Math.cos(middleAngle), newRadius * Math.sin(middleAngle), 0 ];
};

export const getBezierEnd = (startAngle, angleLength, radius) => {
	return [ radius * Math.cos(startAngle + angleLength), radius * Math.sin(startAngle + angleLength), 0 ];
};

export const getScale = (act, max) => {
	return act / max;
};

export const arcSegments = 50;
