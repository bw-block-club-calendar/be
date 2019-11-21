-- `find()` returns a list of all events with their locations
select e.*, l.name, l.coordinates, l.street_address, l.street_address_2, l.city, l.zipcode, l.state
from events as e
join locations as l
on e.location_id = l.id;
order by e.start

-- `findBy(filter)` returns a list of all users that match a JSON { key: value }  `filter` criteria
select u.*
from users as u
where 'key' = 'value';

-- `add(user)` registers a new user in the database
insert into users 
(username, password, email) values ('username', 'password', 'email');

-- `findById(id)` returns the user with id 'id'
select first u.id, u.username
from users as u
where u.id = 'id'