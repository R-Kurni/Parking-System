import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {
	return (
		<>
			<Container fluid className="NavBar">
				<Row>
					<Col className="center-navbar">
						<Link className="nav-link NavBar-Button" to="/">
							<div>PARKING LIST</div>
						</Link>
						<Link className="nav-link NavBar-Button" to="/add-parking">
							<div>ADD PARKING</div>
						</Link>
					</Col>
				</Row>
			</Container>
		</>
	);
}
