import {
	Container,
	Col,
	Row,
	Table,
	Form,
	Card,
	InputGroup,
} from "react-bootstrap";
import ParkingRowData from "../components/ParkingRowData";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchParkings } from "../store/actions/actionCreator";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { parkings } = useSelector((state) => {
		return state.parkings;
	});

	const [userInput, setUserInput] = useState({
		type: "",
		timeInS: "",
		timeInE: "",
		priceS: 0,
		priceE: 0,
	});

	const changeInputHandler = (e) => {
		const { value, name } = e.target;
		setUserInput({
			...userInput,
			[name]: value,
		});
	};

	const submitHandler = (e) => {
		console.log(userInput);
		e.preventDefault();
		dispatch(fetchParkings(userInput)).then(() => {
			navigate("/");
		});
	};

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
					<Container>
						<Card className="mb-3">
							<Card.Body>
								<Form onSubmit={submitHandler}>
									<Row>
										<Col>
											<Form.Group>
												<Card.Title className="Center">
													Type of Vehicle
												</Card.Title>
												<hr></hr>
												<Form.Select
													value={userInput.type}
													onChange={changeInputHandler}
													name="type"
													required
												>
													<option value=" ">All</option>
													<option value="Car">Car</option>
													<option value="Motorcycle">Motorcycle</option>
												</Form.Select>
												<Form.Text className="text-muted">
													Show vehicle type...
												</Form.Text>
											</Form.Group>
										</Col>
										<Col sm={5}>
											<Form.Group>
												<Card.Title className="Center">Time In</Card.Title>
												<hr></hr>
												<Row style={{ display: "flex" }}>
													<Col>
														<Form.Control
															value={userInput.timeIn}
															onChange={changeInputHandler}
															name="timeInS"
															type="datetime-local"
														/>
														<Form.Text className="text-muted">
															Time In from...
														</Form.Text>
													</Col>
													<Col>
														<Form.Control
															value={userInput.timeIn}
															onChange={changeInputHandler}
															name="timeInE"
															type="datetime-local"
														/>
														<Form.Text className="text-muted">
															Time In up to...
														</Form.Text>
													</Col>
												</Row>
											</Form.Group>
										</Col>
										<Col sm={5}>
											<Form.Group>
												<Card.Title className="Center">Price</Card.Title>
												<hr></hr>
												<Row style={{ display: "flex" }}>
													<Col>
														<InputGroup>
															<InputGroup.Text>Rp</InputGroup.Text>
															<Form.Control
																value={userInput.priceS}
																onChange={changeInputHandler}
																name="priceS"
																type="number"
															/>
															<InputGroup.Text>,00</InputGroup.Text>
														</InputGroup>
														<Form.Text className="text-muted">
															Price from...
														</Form.Text>
													</Col>
													<Col>
														<InputGroup>
															<InputGroup.Text>Rp</InputGroup.Text>
															<Form.Control
																value={userInput.priceE}
																onChange={changeInputHandler}
																name="priceE"
																type="number"
															/>
															<InputGroup.Text>,00</InputGroup.Text>
														</InputGroup>
														<Form.Text className="text-muted">
															Price up to...
														</Form.Text>
													</Col>
												</Row>
											</Form.Group>
										</Col>
									</Row>
									<br></br>
									<div className="Center">
										<button className="BTN-Confirm" type="submit">
											Filter
										</button>
									</div>
								</Form>
							</Card.Body>
						</Card>
					</Container>
				</Row>
				<Row className="mb-5">
					<hr></hr>
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
