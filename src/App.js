import './App.css';
import CircleCanvas from 'containers/CircleCanvas';

const data = [
	{
		category: 'Carrer',
		grade: '5',
		color: '#59F316'
	},
	{
		category: 'Environment',
		grade: '8',
		color: '#EF767A'
	},
	{
		category: 'Life Purpose',
		grade: '7',
		color: '#7D7ABC'
	},
	{
		category: 'Nutrition',
		grade: '4',
		color: '#3a86ff'
	},
	{
		category: 'Self Esteem',
		grade: '1',
		color: '#FFE347'
	}
];

function App() {
	return (
		<div className="App">
			<CircleCanvas data={data} />
		</div>
	);
}

export default App;
