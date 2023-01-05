# PARKING API Documentation

## Models :

_Parking_

```
- type : string, required,
- timeIn : string, required,
- timeOut : string, required,
- price : integer, required,
```

&nbsp;

## Endpoints :

List of available endpoints:
​

- `GET /parkings`
- `POST /parkings`

&nbsp;

## 1. GET /parkings

Description:

- Fetch all parkings data from database

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "type": "string",
    "timeIn": "string",
    "timeOut": "string",
    "price": "integer",
    "createdAt": "string",
    "updatedAt": "string"
  },
  ...,
]
```

&nbsp;

## 2. POST /parkings

Description:

- Create a parking data into database

Request:

- body:

```json
{
	"type": "string",
	"timeIn": "string",
	"timeOut": "string"
}
```

_Response (201 - Created)_

```json
{
	"parking": {
		"id": "integer",
		"type": "string",
		"timeIn": "string",
		"timeOut": "string",
		"price": "integer",
		"updatedAt": "string",
		"createdAt": "string"
	}
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Type is required"
}
OR
{
  "message": "Time In is required"
}
OR
{
  "message": "Time Out is required"
}
OR
{
  "message": "Invalid Input"
}
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
	"message": "Internal Server Error"
}
```
