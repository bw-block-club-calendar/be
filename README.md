# Block Club Calendar v1.0.0

API for Block Club Calendar

- [Auth](#auth)
	- [Login user](#login-user)
	- [Register new user](#register-new-user)

- [Profile](#profile)
	- [Create profile](#create-profile)
	- [Get all profiles](#get-all-profiles)
	- [Get own profile](#get-profile-by-id)
	- [Update profile](#update-profile)
	- [Delete profile](#delete-profile)
  
- [Organization](#organization)
	- [Create organization](#create-organization)
	- [Get all organizations](#get-all-organizations)
	- [Get own organization](#get-own-organization)
	- [Get organization by id](#get-organization-by-id)
	- [Update organization](#update-organization)
	- [Delete organization](#delete-organization)

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

### Example request body

Example request:

```
{
  "user_id": 2,
  "first_name": "Test",
  "last_name": "User",
	"location": {
    "name": "testUser's House",
    "coordinates": null,
    "street_address": "7432 Brush St",
    "street_address_2": null,
    "city": "Detroit",
    "zipcode": "48202",
    "state": "MI"
	}
}
```

### Success Response

Success-Response:

```
 HTTP/1.1 201 CREATED
{
  "user_id": 2,
  "username": "testUser",
  "profile": {
    "id": 13,
    "first_name": "Test",
    "last_name": "User",
    "location_id": 19,
    "location": {
      "id": 19,
      "name": "testUser's House",
      "coordinates": null,
      "street_address": "7432 Brush St",
      "street_address_2": null,
      "city": "Detroit",
      "zipcode": "48202",
      "state": "MI"
    }
  }
}
```
### Error Response

User not authenticaed
```
HTTP/1.1 401 UNAUTHORIZED
{
  "message": "Invalid credentials (must be own profile)"
}
```

User has already created profile

``` HTTP/1.1 403 FORBIDDEN
{
  "message": "User has previously created profile, use PUT"
}
```

## Get all profiles

	GET /api/profile/

### Description and Constraints

Logged in adminsitrators see all profiles in the database

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
[
  {
    "id": 1,
    "first_name": "Test",
    "last_name": "Readme",
    "location_id": null
  },
  {
    "id": 2,
    "first_name": "Test",
    "last_name": "User",
    "location_id": 1
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

## Get own profile

	GET /api/profile/own

### Description and Constraints

Logged in users can see their own profile.

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
{
  "user_id": 2,
  "username": "testUser",
  "profile": {
    "id": 2,
    "first_name": "Test",
    "last_name": "User",
    "location_id": 21,
    "location": {
      "id": 21,
      "name": "testUser's House",
      "coordinates": null,
      "street_address": "7432 Brush St",
      "street_address_2": null,
      "city": "Detroit",
      "zipcode": "48202",
      "state": "MI"
    }
  }
}
```
### Error Response

User not authenticated

```
HTTP/1.1 401 UNAUTHORIZED
{
  "message": "Invalid credentials"
}
```

## Update profile

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

## Delete profile

	DEL /api/profile/:id

### Description and Constraints

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

# Organization

## Create organization

	POST /api/organization/

### Description and Constraints

Logged in users create a organization associated with their account

### HTTP Request Parameters

| Name       | Type       | Description                    | Constraints   | 
|------------|------------|--------------------------------|---------------|
| user_id    | integer		|   Logged in user's id 			   | Required      |
| name       | String	  	|   Organization's name					 | Unique        |
| org_phone  | String	  	|   Organization's phone number	 |               |
| org_email  | String	  	|   Organization's email address |               |
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

### Example Request Body

Example request:

```
{
  "user_id": 9,
  "name": "New TechTown Detroit",
  "org_phone": "3138795250",
	"org_emal": "info@techtowndetroit.org",
	"location": {
    "name": "TechTown Detroit",
    "coordinates": null,
    "street_address": "440 Burroughs St",
    "street_address_2": null,
    "city": "Detroit",
    "zipcode": "48202",
    "state": "MI"
	}
}
```

### Success Response

Success-Response:

```
 HTTP/1.1 201 CREATED
{
  "user_id": 9,
  "username": "testUser12",
  "organization": {
    "id": 9,
    "name": "New TechTown Detroit",
    "org_phone": "3138795250",
    "org_email": null,
    "location_id": 23,
    "location": {
      "id": 23,
      "name": "TechTown Detroit",
      "coordinates": null,
      "street_address": "440 Burroughs St",
      "street_address_2": null,
      "city": "Detroit",
      "zipcode": "48202",
      "state": "MI"
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

User has already created profile

``` HTTP/1.1 403 FORBIDDEN
{
  "message": "User has previously created profile, use PUT"
}
```

## Get all organizations

	GET /api/organization/

### Description and Constraints

Logged in users can see all organizations in the database

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
[
  {
    "id": 1,
    "name": "TechTown Detroit",
    "org_phone": "3138795250",
    "org_email": null,
    "location_id": 17
  },
  {
    "id": 2,
    "name": "Bamboo Detroit",
    "org_phone": "3137660134",
    "org_email": "terri@bamboodetroit.com",
    "location_id": 3
  }
]
```
### Error Response

User not authenticated

```
HTTP/1.1 401 UNAUTHORIZED
{
  "message": "Invalid credentials"
}
```

## Get own organization

	GET /api/organization/own

### Description and Constraints

Logged in users can see their own organization.

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
{
  "user_id": 8,
  "username": "testUser11",
  "organization": {
    "id": 3,
    "name": "TechTown Detroit",
    "org_phone": "3138795250",
    "org_email": null,
    "location_id": 17,
    "location": {
      "id": 17,
      "name": "TechTown Detroit",
      "coordinates": null,
      "street_address": "440 Burroughs St",
      "street_address_2": null,
      "city": "Detroit",
      "zipcode": "48202",
      "state": "MI"
    }
  }
}
```
### Error Response

User not authenticated

```
HTTP/1.1 401 UNAUTHORIZED
{
  "message": "Invalid credentials"
}
```

## Get organization by id

	GET /api/organization/:id

### Description and Constraints

Logged in users can see any organization by id.

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
{
  "id": 3,
  "name": "TechTown Detroit",
  "org_phone": "3138795250",
  "org_email": null,
  "location_id": 17,
  "location": {
    "id": 17,
    "name": "TechTown Detroit",
    "coordinates": null,
    "street_address": "440 Burroughs St",
    "street_address_2": null,
    "city": "Detroit",
    "zipcode": "48202",
    "state": "MI"
  }
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

Organization with requested id is not in database

```
HTTP/1.1 404 NOT FOUND
{
  "message": "Organization with requested id is not found in database"
}
```

## Update organization

	PUT /api/organization/:id

### Description and Constraints

Logged in users can update their own organization.
Logged in administrators can update any organization by id.

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
[
  {
    "user_id": 1,
    "username": "testReadme",
    "organization": {
      id: ,
      name: ,
      org_phone: ,
      org_email: ,
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

```
HTTP/1.1 401 UNAUTHORIZED
{
  "message": "Invalid credentials"
}
```

Organization with requested id is not in database

```
HTTP/1.1 404 NOT FOUND
{
  "message": "Organization with requested id is not found in database"
}
```

## Delete organization

	DEL /api/organization/:id

### Description and Constraints

Logged in users can update delete own organization.
Logged in administrators can delete any organization by id.

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
{
  "user_id": id,
  "organization_id": id,
  "message": "Organization deleted"
}
```
### Error Response

User not authenticated
Logged in user deleting organization other than their own

```
HTTP/1.1 401 UNAUTHORIZED
{
  "message": "Invalid credentials"
}
```

Organization with requested id is not in database

```
HTTP/1.1 404 NOT FOUND
{
  "message": "Organization with requested id is not found in database"
}
```