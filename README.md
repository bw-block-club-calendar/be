# Block Club Calendar v1.0.0

API for Block Club Calendar

- [Auth](#auth)
	- [Login user](#login-user)
	- [Register new user](#register-new-user)

# Auth

## Login user



	POST /auth/login


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| username| String		|  <p>User username</p>						  	 |
| password| String		|  <p>User password</p>						   	 |

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
{
  "id": 6,
  "username": "testUser",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhdXJlbjIiLCJpYXQiOjE1NjY5NjQwMTEsImV4cCI6MTU2Njk5MjgxMX0.obJuqN2dWQa5sX6QTNDrQ1o5wUqm4hWjXnhJ8hagiV4"
}
```
### Error Response

Missing required parameters

```
HTTP/1.1 400
{
  "message": "Invalid credentials"
  ]
}
```
## Register new user



	POST /auth/register


### Parameters

| Name     | Type       | Description                       |
|----------|------------|-----------------------------------|
| username | String			|  <p>User username</p>							|
| password | String			|  <p>User password</p>							|
| email    | String			| <p>User's email address</p>       |

### Success Response

Success-Response:

```
 HTTP/1.1 201 Created
{
  "id": 6,
  "username": "testUser",
  "email": "testuser@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhdXJlbjIiLCJpYXQiOjE1NjY5NjQwMTEsImV4cCI6MTU2Njk5MjgxMX0.obJuqN2dWQa5sX6QTNDrQ1o5wUqm4hWjXnhJ8hagiV4"
}
```
### Error Response

Missing required parameters, duplicate username, duplicate email

```
HTTP/1.1 400
{
  "message": "Invalid information about the user, see errors for details",
  "errors": [
    "Username must contain at least 2 characters",
    "Password must contain at least 4 characters",
    "Email must be valid",
    "That username is taken",
    "That email is taken"
  ]
}
```