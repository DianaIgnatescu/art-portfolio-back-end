# art-portfolio-back-end

**Back End URL**: https://art-portfolio-project-back-end.herokuapp.com

**Front End URL**: https://art-portfolio-project-front-end.netlify.com

### _Usage_

## Credentials

### Register a user

*method url*: `/api/register`

*http method*: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `username`     | String | Yes      | Must be unique           |
| `password`     | String | Yes      |                          |
| `email`        | String | No       |                          |

#### Request
###### Example request
```
  {
    "username": "Marion",
    "password": "1234",
    "email": "marion@email.com",
  }
  ```
  
  #### Response
  ##### 201 (Created)
  ###### Example Response

```
  {
    "id": 8,
    "username": "Marion",
    "password": "1234",
    "email": "marion@email.com"
  }
```

##### 400 (Bad Request)
###### Example Response
```
  {
    "errorMessage": "Missing required fields."
  }
```

### Login a user
*method url*: `/api/login`

*http method*: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `username`     | String | Yes      | must be registered user  |
| `password`     | String | Yes      |                          |


#### Request
###### Example request
```
  {
    "username": "Elliot",
    "password": "1234",
  }
  ```
#### Response
##### 200 (OK)
###### Example response
```
  {
    "userId": 5,
    "username": "Elliot",
    "email": "elliot@gmail.com",
    "message": "Welcome Elliot!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJ1c2VybmFtZSI6IkVsbGlvdCIsImVtYWlsIjoiZWxsaW9
    0QGdtYWlsLmNvbSIsImlhdCI6MTU1NTYyMTQ4NCwiZXhwIjoxNTU1NjI1MDg0fQ.k4XzOQi-eElnSkdqReipzowTMugtvjiNcHkxH8kdIfw"
  }
```
##### 400 (Bad Request)
```
  {
    "errorMessage": "Missing username or password."
  }
  ```
  ##### 401 (Unauthorized)
  ```
  {
    errorMessage: "Invalid credentials."
  }
  ```
  ## Users
  ### Get all users
  *method url*: `/api/users`
  
  *http method*: **[GET]**
  
  #### Headers
  
  | name           | type   | required | description                 |
  | -------------- | ------ | -------- | --------------------------- |
  | `Content-Type` | String | Yes      | Must be application/json    |
  | `authorization`| String | Yes      | token to Authorize request  |
  
  
  #### Response
  ##### 200 (OK)
  
  ###### Example response
  ```
  [
    {
      "id": 1,
      "username": "Diana",
      "password": "$2a$10$vBEEx72D56pUbuzQ0ne5VeeHzkhpi/i7YzVsKOP/N5OAoFSGN7ifi",
      "email": "diana@gmail.com"
    },
    {
      "id": 2,
      "username": "Carmen",
      "password": "$2a$10$vBEEx72D56pUbuzQ0ne5VeeHzkhpi/i7YzVsKOP/N5OAoFSGN7ifi",
      "email": "carmen@gmail.com"
    },
    {
      "id": 3,
      "username": "Louis",
      "password": "$2a$10$vBEEx72D56pUbuzQ0ne5VeeHzkhpi/i7YzVsKOP/N5OAoFSGN7ifi",
      "email": "Louis@gmail.com"
    },
    {
      "id": 4,
      "username": "John",
      "password": "$2a$10$vBEEx72D56pUbuzQ0ne5VeeHzkhpi/i7YzVsKOP/N5OAoFSGN7ifi",
      "email": "john@gmail.com"
    },
    {
      "id": 5,
      "username": "Elliot",
      "password": "$2a$10$vBEEx72D56pUbuzQ0ne5VeeHzkhpi/i7YzVsKOP/N5OAoFSGN7ifi",
      "email": "elliot@gmail.com"
    },
    {
      "id": 6,
      "username": "Doug",
      "password": "$2a$10$1eS0iEPTFWCHzS9hGAIvp.K5xbpvp5DMqkXNaTHoGt.y4qU3cK2i.",
      "email": "doug@email.com"
    }
  ]
  ```
  
  ### Get a single user
  ***
  *method url*: `/api/users/:id`
  
  *http method*: **[GET]**
  
  #### Response
  ##### 200 (OK)
  
  ###### Example response
  ```
  [
    {
      "id": 5,
      "username": "Elliot",
      "password": "$2a$10$vBEEx72D56pUbuzQ0ne5VeeHzkhpi/i7YzVsKOP/N5OAoFSGN7ifi",
      "email": "elliot@gmail.com"
    }
  ]
  ```
  
  ##### 404 (Not Found)
  
  ###### Example response
  
  ```
  {
    "message": "The user with the specified ID does not exist."
  }
  ```
  
  ### Delete a user
  ***
  *method url*: `/api/users/:id`
  
  *http method*: **[DELETE]**
  
  #### Headers
  
  | name           | type   | required | description                 |
  | -------------- | ------ | -------- | --------------------------- |
  | `Content-Type` | String | Yes      | Must be application/json    |
  | `authorization`| String | Yes      | token to Authorize request  |
  
  #### Response
  ##### 200 (OK)
  ###### Example Response
  ```
  {
    "message": "The user with the id 9 has now been removed from the database."
  }
  ```
  ##### 401 (Unauthorized)
  ###### Example Response
  ```
  {
    "error": "No token provided, must be set on the Authorization Header"
  }
  ```
  ##### 403 (Forbidden)
  ###### Example Response
  ```
  {
    "name": "JsonWebTokenError",
    "message": "invalid token"
  }
  ```
  
   ### Edit a user
   ***
*method url*: `/api/users/:id`

*http method*: **[PUT]**

#### Headers

| name           | type   | required | description                 |
| -------------- | ------ | -------- | --------------------------- |
| `Content-Type` | String | Yes      | Must be application/json    |
| `authorization`| String | Yes      | token to Authorize request  |

#### Response
##### 200 (OK)
###### Example Response

> Should return the updated record
```
{
  "user": {
    "id": "9",
    "username": "Arthur",
    "password": "$2a$12$SH/1wKf05udS4ggLzBA3Ee3J0jI0nBIEhFJe1h9tbsNFxdGXsibci",
    "email": "arthur@email.com"
  }
}
```
##### 401 (Unauthorized)
###### Example Response
```
{
    "error": "No token provided, must be set on the Authorization Header"
}
```
##### 403 (Forbidden)
###### Example Response
```
  {
    "name": "JsonWebTokenError",
    "message": "invalid token"
  }
```

***
## Posts
***
### Get all posts
***
*method url*: `/api/posts`

*http method*: **[GET]**

#### Response
##### 200 (OK)

###### Example response
```
[
 {
   "id": 1,
   "postName": "Weekday Trip to Paris",
   "description": "I had the most wonderful time because I don't have a job",
   "imageUrl": "https://loremflickr.com/g/320/240/paris",
   "userId": 1,
   "upvotes": [
       4,
       5,
       7,
       8
   ]
 },
 {
   "id": 2,
   "postName": "A man's best friend",
   "description": "I love my dog",
   "imageUrl": "https://loremflickr.com/320/240/dog",
   "userId": 2,
   "upvotes": [
       1,
       4,
       7,
       9
   ]
 },
 {
   "id": 3,
   "postName": "Beautiful portrait",
   "description": "Just as beautiful as the Mona Lisa",
   "imageUrl": "https://loremflickr.com/320/240/paris,girl/all",
   "userId": 3,
   "upvotes": [
       1,
       7,
       8
   ]
 },
 {
   "id": 4,
   "postName": "Morning ritual",
   "description": "There's nothing better than a cup of coffee in the morning",
   "imageUrl": "https://loremflickr.com/320/240/coffee",
   "userId": 4,
   "upvotes": [
       2
   ]
 },
 {
   "id": 5,
   "postName": "Sunday mood",
   "description": "My favorite past time activity",
   "imageUrl": "https://loremflickr.com/320/240/sleep",
   "userId": 5,
   "upvotes": [
       1,
       4
   ]
 },
 {
   "id": 6,
   "postName": "Exploring nature",
   "description": "Summer is here!",
   "imageUrl": "https://loremflickr.com/320/240/sun",
   "userId": 6,
   "upvotes": [
       2,
       4
   ]
 },
 {
   "id": 7,
   "postName": "Wonderful sculpture",
   "description": "Pretty statue I found during my adventures",
   "imageUrl": "https://loremflickr.com/320/240/statue",
   "userId": 1,
   "upvotes": [
       1,
       4
   ]
 },
]
```

### Get a single post
***
*method url*: `/api/posts/:id`

*http method*: **[GET]**

#### Response
##### 200 (OK)

###### Example response
```

{
  "id": 9,
  "postName": "My Birthday",
  "description": "Happy Birthday to me!",
  "imageUrl": "https://loremflickr.com/320/240/cake",
  "userId": 1
}

```

##### 404 (Not Found)

###### Example response
```
{
  "message": "The post with the specified ID does not exist."
}
```

### Get posts from a specific user
***
*method url*: `/api/posts/?userId=${userId}`

*http method*: **[GET]**

#### Response
##### 200 (OK)

###### Example response
```
[
  {
    "id": 2,
    "postName": "A man's best friend",
    "description": "I love my dog",
    "imageUrl": "https://loremflickr.com/320/240/dog",
    "userId": 2,
    "upvotes": [
        1,
        4,
        7,
        9
    ]
  },
  {
    "id": 8,
    "postName": "People watching",
    "description": "I like taking pictures of people",
    "imageUrl": "https://loremflickr.com/320/240/man",
    "userId": 2,
    "upvotes": [
        1
    ]
  }
]
```

### Create a post
***
*method url*: `/api/posts`

*http method*: **[POST]**

#### Headers

| name           | type   | required | description                 |
| -------------- | ------ | -------- | ------------------------    |
| `Content-Type` | String | Yes      | Must be application/json    |
| `authorization`| String | Yes      | token to Authorize request  |
#### Body

| name           | type   | required | description                 |
| -------------- | ------ | -------- | ------------------------    |
| `postName`     | String | Yes      |                             |
| `imageUrl`     | String | Yes      |                             |
| `description`  | String | No       |                             |

#### Request
###### Example Request
```
  {
    "postName": "A man's best friend",
    "imageUrl": "https://loremflickr.com/320/240/dog",
    "description": "A picture of my dog",
  }
  ```

#### Response
##### 201 (Created)
###### Example Response
```
{
  "id": 13,
  "postName": "A man's best friend",
  "description": "I love my dog",
  "imageUrl": "https://loremflickr.com/320/240/dog",
  "userId": 5,
  "upvotes": []
}

```
##### 401 (Unauthorized)
###### Example Response
```
{
  "No token provided, must be set on the Authorization Header"
}
```

##### 403 (Forbidden)
###### Example Response
```
{
  "name": "JsonWebTokenError",
  "message": "invalid token"
}
```

### Edit a post
***
*method url*: `/api/posts/:id`

*http method*: **[PUT]**

#### Headers

| name           | type   | required | description                 |
| -------------- | ------ | -------- | --------------------------- |
| `Content-Type` | String | Yes      | Must be application/json    |
| `authorization`| String | Yes      | token to Authorize request  |

#### Body

| name           | type   | required | description                 |
| -------------- | ------ | -------- | ----------------------------|
| `postName`     | String | No       |                             |
| `imageUrl`     | String | No       |                             |
| `description`  | String | No       |                             |


#### Request
###### Example request
```
  {
    "postName": "A man's best friend",
    "description": "I love my dogs",
    "imageUrl": "https://loremflickr.com/320/240/dog"
  }
  ```
#### Response
##### 200 (OK)
###### Example Response
```
  {
    "postName": "A man's best friend",
    "description": "I love my dogs",
    "imageUrl": "https://loremflickr.com/320/240/dog",
    "id": 13,
    "userId": 5,
    "upvotes": []
  }
```
##### 401 (Unauthorized)
###### Example Response
```
{
  "error": "No token provided, must be set on the Authorization Header"
}
```
##### 403 (Forbidden)
###### Example Response
```
  {
    "name": "JsonWebTokenError",
    "message": "invalid token"
  }
```

### Delete a Post
***
*method url*: `/api/posts/:id (where id is the id of the post`

*http method*: **[DELETE]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |
| `authorization`| String | Yes      | token to Authorize user  |

#### Response
##### 200 (ok)
###### Example Response
```
{
  "message": "The post with the ID 2 has now been removed from the database."
}
```
##### 401 (Unauthorized)
###### Example Response
```
{
  "error": "No token provided, must be set on the Authorization Header"
}
```
##### 403 (Forbidden)
###### Example Response
```
  {
    "name": "JsonWebTokenError",
    "message": "invalid token"
  }
```

### Get upvotes for a post
***
*method url*: `/api/posts/upvotes/:postId`

*http method*: **[GET]**

#### Response
##### 200 (OK)
###### Example Response
```
{
  "success": true,
  "postId": "13",
  "upvotes": 0
}
```

##### 404 (Not Found)
###### Example Response
```
{
  "message": "The post with the specified ID does not exist."
}
```

### Upvote a Post
***
*method url*: `/api/posts/upvote/:postId`

*http method*: **[PUT]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |
| `authorization`| String | Yes      | token to Authorize user  |

#### Response
##### 200 (OK)
###### Example Response
```
{
  "success": true,
  "userId": 5,
  "postId": "3"
}
```

##### 500 (Internal Server Error)
###### Example Response
```
  {
    "errorMessage": "Like already in database"
  }
```

### Downvote a Post
***
*method url*: `/api/posts/upvote/:postId/:userId`

*http method*: **[PUT]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |
| `authorization`| String | Yes      | token to Authorize user  |

#### Response
##### 200 (ok)
###### Example Response
```
{
  "success": true,
  "userId": 5,
  "postId": "3"
}
```

##### 500 (Internal Server Error)
###### Example Response
```
 {
   "errorMessage": "Like not in database"
 }
```
