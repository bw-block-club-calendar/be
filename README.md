# Block Club Calendar v1.0.0

API for Block Club Calendar

- [Auth](#auth)
	- [Login user](#login-user)
	- [Register new user](#register-new-user)

- [Profile](#profile)
	- [Create new profile](#add-profile)
	- [See all profiles](#get-profile)
	- [See profile by id](#get-id-profile)
	- [Update a profile](#update-profile)
	- [Delete a profile](#delete-profile)
  
- [Organization](#organization)
	- [Create new organization](#add-organization)
	- [See all organizations](#get-organization)
	- [See organization by id](#get-id-organization)
	- [Update an organization](#update-organization)
	- [Delete an organization](#delete-organization)

# Auth

## Login user

	POST /api/auth/login

### Description and Constraints

Logs in to an existing account

### HTTP Request Parameters

| Name     | Type       | Description                      | Constraints   | 
|----------|------------|----------------------------------|---------------|
| username | String	  	|   User username 						  	 | Required      |
| password | String	  	|   User password 						   	 | Required      |

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
HTTP/1.1 401 UNAUTHORIZED
{
  "message": "Invalid credentials"
}
```
## Register new user

	POST /api/auth/register

### Description and Constraints

Creates a new account with permission type "user"

### HTTP Request Parameters

| Name     | Type       | Description                  | Constraints       | 
|----------|------------|------------------------------|-------------------|
| username | String			|  User username  						 | Required, unique  |
| password | String			|  User password  						 | Required          |
| email    | String			|  User's email address        | Required, unique  |

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
HTTP/1.1 400 BAD REQUEST
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

# Profile

## Create profile

	POST /api/profile/

### Description and Constraints

Logged in users create a profile associated with their account

### HTTP Request Parameters

| Name       | Type       | Description                    | Constraints   | 
|------------|------------|--------------------------------|---------------|
| user_id    | integer		|   Logged in user's id 			   | Required      |
| first_name | String	  	|   User's first name 					 |               |
| last_name  | String	  	|   User's last name 						 |               |
| location   | Object	  	|   Location object  						 |               |

### Location Object Parameters

| Name              | Type     | Description                    | Constraints   | 
|-------------------|----------|------------------------------- |---------------|
| name              | String	 |   Name of location 						|               |
| coordinates       | String	 |   Map API coordindates         |               |
| street_address    | String	 |   First line of street address |               |
| street_address_2  | String 	 |   Second line of address       |               |
| city              | String 	 |   City name                    |               |
| zipcode           | String 	 |   zipcode                      |               |
| state             | String 	 |   state or province            |               |

### Success Response

Success-Response:

```
 HTTP/1.1 201 CREATED
{
  "user_id": 6,
  "username": "testUser",
  "profile": {
    id: ,
    first_name: ,
    last_name: ,
    location: {
      id: ,
      name: ,
      coordinates: ,
      street_address: ,
      street_address_2: ,
      city: ,
      zipcode: ,
      state: ,
    }
  }
}
```
### Error Response

User not authenticaed

```
HTTP/1.1 401 UNAUTHORIZED
{
  "message": "Invalid credentials"
}
```

## See all profiles

	GET /api/profile/

### Description and Constraints

Logged in adminsitrators see all profiles in the database

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
[
  {
    "user_id": 1,
    "username": "testReadme",
    "profile": {
      id: ,
      first_name: ,
      last_name: ,
      location: {
        id: ,
        name: ,
        coordinates: ,
        street_address: ,
        street_address_2: ,
        city: ,
        zipcode: ,
        state: ,
      }
    }
  },
  {
    "user_id": 2,
    "username": "testReadme2",
    "profile": {
      id: ,
      first_name: ,
      last_name: ,
      location: {
        id: ,
        name: ,
        coordinates: ,
        street_address: ,
        street_address_2: ,
        city: ,
        zipcode: ,
        state: ,
      }
    }
  },
]
```
### Error Response

User not authenticated as administrator

```
HTTP/1.1 401 UNAUTHORIZED
{
  "message": "Invalid credentials"
}
```

## See profile by id

	GET /api/profile/:id

### Description and Constraints

Logged in users can see their own profile.
Logged in administrators can see any profile by id.

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
[
  {
    "user_id": 1,
    "username": "testReadme",
    "profile": {
      id: ,
      first_name: ,
      last_name: ,
      location: {
        id: ,
        name: ,
        coordinates: ,
        street_address: ,
        street_address_2: ,
        city: ,
        zipcode: ,
        state: ,
      }
    }
  },
]
```
### Error Response

User not authenticated
Logged in user requesting profile other than their own

```
HTTP/1.1 401 UNAUTHORIZED
{
  "message": "Invalid credentials"
}
```

User with requested id is not in database

```
HTTP/1.1 404 NOT FOUND
{
  "message": "User with requested id is not found in database"
}
```

## Update a profile

	PUT /api/profile/:id

### Description and Constraints

Logged in users can update their own profile.
Logged in administrators can update any profile by id.

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
[
  {
    "user_id": 1,
    "username": "testReadme",
    "profile": {
      id: ,
      first_name: ,
      last_name: ,
      location: {
        id: ,
        name: ,
        coordinates: ,
        street_address: ,
        street_address_2: ,
        city: ,
        zipcode: ,
        state: ,
      }
    }
  },
]
```

### Error Response

User not authenticated
Logged in user requesting profile other than their own

```
HTTP/1.1 401 UNAUTHORIZED
{
  "message": "Invalid credentials"
}
```

User with requested id is not in database

```
HTTP/1.1 404 NOT FOUND
{
  "message": "User with requested id is not found in database"
}
```

## Delete a profile

	DEL /api/profile/:id

### Description and Constraints

Logged in users can update delete own profile.
Logged in administrators can delete any profile by id.

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
{
  "user_id": id,
  "profile_id": id,
  "message": "Profile deleted"
}
```
### Error Response

User not authenticated
Logged in user requesting profile other than their own

```
HTTP/1.1 401 UNAUTHORIZED
{
  "message": "Invalid credentials"
}
```

User with requested id is not in database

```
HTTP/1.1 404 NOT FOUND
{
  "message": "User with requested id is not found in database"
}
```