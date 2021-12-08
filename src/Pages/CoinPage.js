import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { makeStyles } from '@material-ui/core';
import CoinInfo from '../components/CoinInfo';

const CoinPage = () => {
	const { id } = useParams();
	const [coin, setCoin] = useState();

	const { currency, symbol } = CryptoState();

	const fetchCoin = async () => {
		const { data } = await axios.get(SingleCoin(id));

		setCoin(data);
	};

	console.log(coin);

	useEffect(() => {
		fetchCoin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const useStyles = makeStyles((theme) => ({
		container: {
			display: 'flex',
			[theme.breakpoints.down('md')]: {
				flexDirection: 'column',
				alignItems: 'center',
			},
		},
		sidebar: {
			width: '30%',
			[theme.breakpoints.down('md')]: {
				width: '100%',
			},
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			marginTop: 25,
			borderRight: '2px solid grey',
		},
	}));

	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.sidebar}>
				<h1>Side Bar</h1>
				{/* sidebar */}
			</div>
			{/* chart */}
			<CoinInfo coin={coin} />
		</div>
	);
};

export default CoinPage;
