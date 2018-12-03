import React, { Component } from 'react';
import styled from 'styled-components';
import PieChart from 'react-minimal-pie-chart';
import MovieService from '../../services/MovieService';

class ReviewCompare extends Component{
	constructor(props) {
		super(props);
	}

	renderGraphs(chartType) {
		if(chartType === "Rotten Tomatoes") {
			return(
				<div>
					<p>Rotten Tomatoes</p>
					<div>
						<PieChart
							data={[
								{ title: "Avengers", value: "8", color: "#E38627" },
								{ title: "Avengers", value: "2", color: "#C13C37" }
							]}
						/>
						<PieChart
							data={[
								{ title: "Act of Valor", value: "23", color: "#E38627" },
								{ title: "Act of Valor", value: "2", color: "#C13C37" }
							]}
						/>
					</div>
					<div>
						<p>Avengers</p>
						<p>Act of Valor</p>
					</div>
				</div>
			);
		}
		else if (chartType === "IMDb") {
			return(
				<div>
					<p>Rotten Tomatoes</p>
					<div>
						<PieChart

						/>
					</div>
				</div>
			);
		}
		else if (chartType === "Metacritic") {
			return(
				<div>
					<p>Rotten Tomatoes</p>
					<div>
						<PieChart

						/>
					</div>
				</div>
			);
		}
		else if (chartType === "Box Office") {
			return(
				<div>
					<p>Rotten Tomatoes</p>
					<div>
						<PieChart

						/>
					</div>
				</div>
			);
		}
		else if (chartType === "Overview") {
			return(
				<div>
					<p>Rotten Tomatoes</p>
					<div>
						<PieChart

						/>
					</div>
				</div>
			);
		}
	}


	render() {
		const {
			movieA,
			movieB,
			chartType,
			movieARating,
			movieBRating
		} = this.props;

		return(
			<div>
				{this.renderGraphs(chartType)}
			</div>
		);
	}
};

export default ReviewCompare;
