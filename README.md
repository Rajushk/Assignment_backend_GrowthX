Assignment Submission Portal - Backend

This is the backend API for an Assignment Submission Portal, where users can upload assignments, and admins can accept or reject them. The system uses Node.js, Express, and MongoDB for handling users and assignments.

Features

    User and Admin registration and login.
    Users can upload assignments tagged to specific admins.
    Admins can view all assignments tagged to them.
    Admins can accept or reject assignments.


Running the Server

	Start the server by running: npm run dev


API Endpoints

	User Endpoints
	  1 Register User
	      Endpoint: POST /api/users/register
	      Description: Register a new user.
	  
	  2 Login User
	      Endpoint: POST /api/users/login
	      Description: Log in a user.
	  
	  3 Upload Assignment
	      Endpoint: POST /api/users/upload
	      Description: Upload an assignment to a specific admin.
	  
	  
	  4 Get All Admins
	      Endpoint: GET /api/users/admins
	      Description: Fetch all registered admins.




Admin Endpoints

	1  Register Admin
	    Endpoint: POST /api/admins/register
	    Description: Register a new admin.
	
	2 Login Admin
	    Endpoint: POST /api/admins/login
	    Description: Log in an admin.
	3 View Admin's Assignments
	    Endpoint: GET /api/admins/assignments
	    Description: View all assignments tagged to the admin.
	
	4 Accept Assignment
	    Endpoint: POST /api/admins/assignments/:id/accept
	    Description: Accept an assignment.
	
	5 Reject Assignment
	  Endpoint: POST /api/admins/assignments/:id/reject
	  Description: Reject an assignment.



Testing the API

	You can test the API using Postman:
	1 Start your server by running npm run dev.
	2 Open Postman and create new requests for each endpoint listed above.
	3 Use the appropriate HTTP method, headers, and request body for each request
