import {
	CircularProgress,
	makeStyles,
	MuiThemeProvider,
} from '@material-ui/core';
import { createTheme } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';
// fix Error: "category" is not a registered scale.
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const CoinInfo = ({ coin }) => {
	const [historicData, setHistoricData] = useState();
	const [days, setDays] = useState(1);
	const { currency } = CryptoState();

	const useStyles = makeStyles((theme) => ({
		container: {
			width: '75%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: 25,
			padding: 40,
			// Responsiveness
			[theme.breakpoints.down('md')]: {
				width: '100%',
				marginTop: 0,
				padding: 20,
				paddingTop: 0,
			},
		},
	}));

	const classes = useStyles();

	const fetchHistoricData = async () => {
		const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

		setHistoricData(data.prices);
	};

	console.log(coin);

	useEffect(() => {
		fetchHistoricData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [days]);

	const darkTheme = createTheme({
		palette: {
			primary: {
				main: '#fff',
			},
			type: 'dark',
		},
	});

	return (
		<MuiThemeProvider theme={darkTheme}>
			<div className={classes.container}>
				{!historicData ? (
					<CircularProgress
						style={{ color: 'steelblue' }}
						size={250}
						thickness={1}
					/>
				) : (
					<>
						<Line
							data={{
								labels: historicData.map((coin) => {
									let date = new Date(coin[0]);
									let time =
										date.getHours() > 12
											? `${date.getHours() - 12}:${date.getMinutes()} PM`
											: `${date.getHours()}:${date.getMinutes()} AM`;
									return days === 1 ? time : date.toLocaleDateString();
								}),
								datasets: [
									{
										data: historicData.map((coin) => coin[1]),
										label: `Price ( Past ${days} Days ) in ${currency}`,
										borderColor: '#1d93ee',
									},
								],
							}}
							options={{
								elements: {
									point: {
										radius: 1,
									},
								},
							}}
						/>
					</>
				)}
			</div>
		</MuiThemeProvider>
	);
};

export default CoinInfo;
