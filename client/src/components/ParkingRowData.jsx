export default function ParkingRowData({ parking, idx }) {
	const rupiah = (number) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
		}).format(number);
	};
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	const date = (string) => {
		return new Date(string).toLocaleDateString("id-ID", options);
	};
	const hour = (string) => {
		return new Date(string).getHours();
	};
	const minute = (string) => {
		return new Date(string).getMinutes();
	};
	return (
		<>
			<tr>
				<td>{idx + 1}</td>
				<td>{parking.type}</td>
				<td>
					{date(parking.timeIn)},{" "}
					{hour(parking.timeIn) < 10
						? "0" + hour(parking.timeIn)
						: hour(parking.timeIn)}
					:
					{minute(parking.timeIn) < 10
						? "0" + minute(parking.timeIn)
						: minute(parking.timeIn)}
				</td>
				<td>
					{date(parking.timeOut)},{" "}
					{hour(parking.timeOut) < 10
						? "0" + hour(parking.timeOut)
						: hour(parking.timeOut)}
					:
					{minute(parking.timeOut) < 10
						? "0" + minute(parking.timeOut)
						: minute(parking.timeOut)}
				</td>
				<td>{rupiah(parking.price)}</td>
			</tr>
		</>
	);
}
