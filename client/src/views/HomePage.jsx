import { Container, Row, Table } from "react-bootstrap";
import ParkingRowData from "../components/ParkingRowData";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchParkings } from "../store/actions/actionCreator";

export default function HomePage() {
	const dispatch = useDispatch();
	const { parkings } = useSelector((state) => {
		return state.parkings;
	});

	useEffect(() => {
		dispatch(fetchParkings());
	}, []);
	return (
		<>
			<Container>
				<Row>
					<h1 className="Title">PARKING LIST</h1>
					<hr></hr>
				</Row>
				<Row>
					<Table bordered>
						<thead>
							<tr>
								<th>No.</th>
								<th>Type of Vehicle</th>
								<th>Time In</th>
								<th>Time Out</th>
								<th>Price</th>
							</tr>
						</thead>
						<tbody>
							{parkings.map((parking, idx) => {
								return (
									<ParkingRowData
										parking={parking}
										idx={idx}
										key={parking.id}
									/>
								);
							})}
						</tbody>
					</Table>
				</Row>
			</Container>
		</>
	);
}
