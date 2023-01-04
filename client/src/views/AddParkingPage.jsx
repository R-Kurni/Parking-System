import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { createParking } from "../store/actions/actionCreator";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddParkingPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [userInput, setUserInput] = useState({
		type: "",
		timeIn: "",
		timeOut: "",
	});

	const changeInputHandler = (e) => {
		const { value, name } = e.target;
		setUserInput({
			...userInput,
			[name]: value,
		});
	};

	const cancelHandler = (e) => {
		navigate("/");
	};

	const submitHandler = (e) => {
		console.log(userInput);
		e.preventDefault();
		dispatch(createParking(userInput)).then(() => {
			navigate("/");
		});
		// console.log(userInput);
	};
	return (
		<>
			<Container>
				<Row>
					<Col sm={3}></Col>
					<Col sm={6}>
						<h1 className="Title">ADD PARKING</h1>
						<hr></hr>
						<Card>
							<Card.Body className="card-align">
								<Form onSubmit={submitHandler}>
									<Form.Group className="mt-3 mb-5">
										<Card.Title className="Center">Type of Vehicle</Card.Title>
										<hr></hr>
										<Row>
											<Col className="Center">
												<Form.Select
													value={userInput.type}
													onChange={changeInputHandler}
													name="type"
													required
												>
													<option value="" disabled>
														-- Select Type --
													</option>
													<option value="Car">Car</option>
													<option value="Motorcycle">Motorcycle</option>
												</Form.Select>
											</Col>
										</Row>
									</Form.Group>
									<Form.Group className="mb-5">
										<Card.Title className="Center">Time In</Card.Title>
										<hr></hr>
										<Row>
											<Col>
												<Form.Control
													value={userInput.timeIn}
													onChange={changeInputHandler}
													name="timeIn"
													type="datetime-local"
													required
												/>
											</Col>
										</Row>
									</Form.Group>
									<Form.Group className="mb-5">
										<Card.Title className="Center">Time Out</Card.Title>
										<hr></hr>
										<Row>
											<Col>
												<Form.Control
													value={userInput.timeOut}
													onChange={changeInputHandler}
													name="timeOut"
													type="datetime-local"
													min={userInput.timeIn}
													required
												/>
											</Col>
										</Row>
									</Form.Group>
									<div className="mb-3 BTN-Content">
										<div className="BTN-Cancel" onClick={cancelHandler}>
											Cancel
										</div>
										<button className="BTN-Confirm" type="submit">
											Confirm
										</button>
									</div>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}
