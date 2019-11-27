# Block Club Calendar v1.0.0

RESTful API developed with Express and Node for "Block Club Calendar." 

- [Product Vision](#product-vision)
	- [Mission](#mission)
	- [Product Specification](#product-specification)
	- [Feature Roadmap](#feature-roadmap)

- [Auth](#auth)
	- [Login user](#login-user)
	- [Register new user](#register-new-user)

- [Profile](#profile)
	- [Create profile](#create-profile)
	- [Get all profiles](#get-all-profiles)
	- [Get own profile](#get-profile-by-id)
	- [(Deprecated) Update profile](#update-profile)
	- [(Deprecated) Delete profile](#delete-profile)
  
- [Organization](#organization)
	- [Create organization](#create-organization)
	- [Get all organizations](#get-all-organizations)
	- [Get own organization](#get-own-organization)
  
- [Event](#event)
	- [Create event](#create-event)
	- [Get all events](#get-all-events)
	- [Get event by id](#get-event-by-id)
	- [Update event](#update-event)
	- [Delete event](#delete-event)
  
- [RSVP](#rsvp)
	- [Create RSVP](#create-rsvp)


# Product Vision

## Mission

Have you ever come home from work to find your neighborhood filled with cars and visitors for a local market, fair, park event, or giveaway that you didn't even know about and missed? Or made weekend plans to travel only to find out that there was a free family event in your town you missed?  BlockClub Calendar is an easy to use app that lets community members or organizations post information for upcoming neighborhood events. By using geolocation, the app lets users sign up for notifications of upcoming events happening in your area, ensuring that you never unintentionally miss a local gathering or event again!

## Product Specification

### User Authentication

User can signup/register for an authenticated account as an Organization or a CommunityMember by providing at a minimum (Mobile, Web):

    * a valid email
    * a unique username
    * a strong password
    * a valid streetAddress
    * a valid city
    * a valid zipcode
    * a businessName (required for business only)
    
### Guest Access

User can use app as a guest with access limited to viewing events in their local area using geolocation. (Mobile, Web)

### Event Creation

Authenticated Organization or CommunityMember can read all listings in their area using geolocation. In addition, they can create, update and delete their own listings for an event. Each event must have the following properties at a minimum (Web, Mobile):

    * eventTitle - String
    * eventAddress - Address
    * geolocation - Coordinates
    * eventDescription - String
    * eventStart - DateTime
    * eventEnd - DateTime
    * externalLink (Facebook listing for example. *Optional) - URL
    
### Event RSVP

Authenticated CommunityMembers can confirm/unconfirm that they will be attending a particular event. (Mobile, Web)

## Feature Roadmap

### Calendar Integration

Integrate with iCal or Google Calendar (Mobile, Web)

### Media Integration

Implement a feature to allow Authenticated users to upload photos of the event to the event listing. (Mobile)

### Location integration

Integrate with location API to provide data on nearest events by user current location or target location search

## Login user

	POST /api/auth/login
	

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

# Event

## Create event

	POST /api/event/

### Description and Constraints

Logged in users create an event associated with their profile or organization

### HTTP Request Parameters

| Name           | Type       | Description                    | Constraints      | 
|----------------|------------|--------------------------------|------------------|
| user_id        | integer		|   Creator's user id 			     | Required         |
| organizer_type | String	   	|   "profile" or "organization"  | Required         |
| title          | String	  	|   Event's title     					 | Required         |
| description    | String	  	|   Description of event      	 | Required         |
| start          | String	  	|   ISO 8601  start date & time  | Required         |
| end            | String	  	|   ISO 8601  end date & time    | Required         |
| ext_link       | String	  	|   Link to external resource 	 |                  |
| image          | String	  	|   Link to img resource      	 |                  |
| location       | Object	  	|   Location object  						 | Required         |

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
  "organizer_type": "profile",
  "title": "Councilperson Sheffield's Town Hall",
  "description": "Join Council President Pro Tem Sheffield and the City Assessor for an in depth discussion on Neighborhood Enterprise Zones and what they mean to you!",
  "start": "Tue Oct 22 2019 18:00:00 GMT-0400 (Eastern Daylight Time)",
  "end": "Tue Oct 22 2019 20:00:00 GMT-0400 (Eastern Daylight Time)",
  "ext_link": "https://detroitmi.gov/",
  "image": "https://detroitmi.gov/sites/detroitmi.localhost/files/2018-11/Mary-Sheffield.jpg",
	"location": {
    "name": "Metropolitain United Methodist Church",
    "coordinates": null,
    "street_address": "8000 Woodward ave",
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
  "event_id": 7,
  "organizer_user_id": 9,
  "organizer_type": "profile",
  "title": "Councilperson Sheffield's Town Hall",
  "description": "Join Council President Pro Tem Sheffield and the City Assessor for an in depth discussion on Neighborhood Enterprise Zones and what they mean to you!",
  "start": "Tue Oct 22 2019 18:00:00 GMT-0400 (Eastern Daylight Time)",
  "end": "Tue Oct 22 2019 20:00:00 GMT-0400 (Eastern Daylight Time)",
  "ext_link": "https://detroitmi.gov/",
  "image": "https://detroitmi.gov/sites/detroitmi.localhost/files/2018-11/Mary-Sheffield.jpg",
	"location": {
    "id": 14
    "name": "Metropolitain United Methodist Church",
    "coordinates": null,
    "street_address": "8000 Woodward ave",
    "street_address_2": null,
    "city": "Detroit",
    "zipcode": "48202",
    "state": "MI"
	}
}
```
### Error Response

Missing required fields

``` HTTP/1.1 400 BAD REQUEST
{
  "message": "User has previously created profile, use PUT"
}
```

User not authenticaed

```
HTTP/1.1 401 UNAUTHORIZED
{
  "message": "Invalid credentials"
}
```

## Get all events

	GET /api/event/

### Description and Constraints

Anyone can see all events sorted by start date in the database

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK
[
  {
    "event_id": 2,
    "user_id": 4,
    "organizer_type": "organization",
    "title": "Trunk-or-Treat with the Lower North End Block Club",
    "description": "Bring your friends and family to enjoy a night of fright on the Michigan Urban Farming Initiative's Campus! There will be handy, hot dog roasting, and a Zombie Walk for the kids.",
    "start": "2019-10-31T18:00:00-0500",
    "end": "2019-10-31T20:00:00-0500",
    "ext_link": null,
    "image": "https://i.ibb.co/hK3St7F/LNE-TOT.png",
    "approved": true,
    "location": {
      "id": 1,
      "name": "Michigan Urban Farming Initiative",
      "coordinates": null,
      "street_address": "7432 Brush St",
      "street_address_2": null,
      "city": "Detroit",
      "zipcode": "48202",
      "state": "MI"
    }
  },
  {
    "event_id": 1,
    "user_id": 3,
    "organizer_type": "profile",
    "title": "Councilperson Sheffield Town Hall",
    "description": "Join Council President Pro Tem Sheffield and the City Assessor for an in depth discussion on Neighborhood Enterprise Zones and what they mean to you!",
    "start": "2019-11-21T18:00:00-0500",
    "end": "2019-11-21T20:00:00-0500",
    "ext_link": "https://detroitmi.gov",
    "image": "https://detroitmi.gov/themes/custom/detroitmi/logo.png",
    "approved": true,
    "location": {
      "id": 2,
      "name": "Metropolitain United Methodist Church",
      "coordinates": null,
      "street_address": "8000 Woodward Ave",
      "street_address_2": null,
      "city": "Detroit",
      "zipcode": "48202",
      "state": "MI"
    }
  },
]
```
### Error Response

No possible client errors


## Get event by id

	GET /api/event/:id

### Description and Constraints

Anyone can see any event by id.

### Success Response

Success-Response:

```
 HTTP/1.1 200 OK

{
  "event_id": 2,
  "user_id": 4,
  "organizer_type": "organization",
  "title": "Trunk-or-Treat with the Lower North End Block Club",
  "description": "Bring your friends and family to enjoy a night of fright on the Michigan Urban Farming Initiative's Campus! There will be handy, hot dog roasting, and a Zombie Walk for the kids.",
  "start": "2019-10-31T18:00:00-0500",
  "end": "2019-10-31T20:00:00-0500",
  "ext_link": null,
  "image": "https://i.ibb.co/hK3St7F/LNE-TOT.png",
  "approved": true,
  "location": {
    "id": 1,
    "name": "Michigan Urban Farming Initiative",
    "coordinates": null,
    "street_address": "7432 Brush St",
    "street_address_2": null,
    "city": "Detroit",
    "zipcode": "48202",
    "state": "MI"
  }
}
```
### Error Response

Event with requested id is not in database

```
HTTP/1.1 404 NOT FOUND
{
  "message": "Event with requested id is not found in database"
}
```

## Update event

	PUT /api/event/:id

### Description and Constraints

Logged in users can update their own events by id.
Logged in administrators can update any event by id.

### HTTP Request Parameters

| Name           | Type       | Description                    | Constraints      | 
|----------------|------------|--------------------------------|------------------|
| event_id       | integer		|   Event to update   			     | Required         |
| organizer_type | String	   	|   "profile" or "organization"  |                  |
| title          | String	  	|   Event's title     					 |                  |
| description    | String	  	|   Description of event      	 |                  |
| start          | String	  	|   ISO 8601  start date & time  |                  |
| end            | String	  	|   ISO 8601  end date & time    |                  |
| ext_link       | String	  	|   Link to external resource 	 |                  |
| image          | String	  	|   Link to img resource      	 |                  |
| location       | Object	  	|   Location object  						 |                  |

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
  "event_id": 2
  "start": "Tue Oct 22 2019 19:00:00 GMT-0400 (Eastern Daylight Time)",
  "end": "Tue Oct 22 2019 22:00:00 GMT-0400 (Eastern Daylight Time)",
	"location": {
    "name": "Metropolitain United Methodist Church",
    "coordinates": null,
    "street_address": "8000 Woodward ave",
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

## Delete event

	DEL /api/event/:id

### Description and Constraints

Logged in users can update delete their own events by id.
Logged in administrators can delete any event by id.

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


# RSVP

## Create RSVP

	POST /api/event/:id/rsvp

### Description and Constraints

Logged in users can RSVP to attend an event

### Example Request Body

No message body required, send empty POST request to endpoint

### Success Response

Success-Response:

```
 HTTP/1.1 201 CREATED
{
  "event_id": 7,
  "organizer_user_id": 9,
  "organizer_type": "profile",
  "title": "Councilperson Sheffield's Town Hall",
  "description": "Join Council President Pro Tem Sheffield and the City Assessor for an in depth discussion on Neighborhood Enterprise Zones and what they mean to you!",
  "start": "Tue Oct 22 2019 18:00:00 GMT-0400 (Eastern Daylight Time)",
  "end": "Tue Oct 22 2019 20:00:00 GMT-0400 (Eastern Daylight Time)",
  "ext_link": "https://detroitmi.gov/",
  "image": "https://detroitmi.gov/sites/detroitmi.localhost/files/2018-11/Mary-Sheffield.jpg",
	"location": {
    "id": 14
    "name": "Metropolitain United Methodist Church",
    "coordinates": null,
    "street_address": "8000 Woodward ave",
    "street_address_2": null,
    "city": "Detroit",
    "zipcode": "48202",
    "state": "MI"
	}
}
```
### Error Response

User not authenticaed

```
HTTP/1.1 401 UNAUTHORIZED
{
  "message": "No credentials provided"
}
```

User has already RSVP'd to event

```
HTTP/1.1 403 FORBIDDEN
{
  "message": "You have already RSVP'd for this event"
}
```

Even does not exsit

```
HTTP/1.1 404 NOT FOUND
{
  "message": "An event with that id is not in our database"
}
```
