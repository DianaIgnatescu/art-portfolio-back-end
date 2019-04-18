# art-portfolio-back-end

**Back End URL**: https://art-portfolio-project-back-end.herokuapp.com

**Front End URL**: https://art-portfolio-project-front-end.netlify.com

### Usage

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
    "userId": 8,
    "username": "Marion",
    "email": "marion@email.com",
    "message": "Welcome Marion!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJzdWJqZWN0Ijo4LCJ1c2VybmFtZSI6Ik1hcmlvbiIsImVtYWlsIjoibWFyaW9uQGVtYWlsLmNvbSIsImlhdCI6MTU1NTU5MTQ5MCwiZXhwIjo
    xNTU1NTk1MDkwfQ.Fp9bi1df7xNNJ63rihGI0sP4WHV-F5E5rf0DPF3zXD8"
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
          "username": "admin",
          "password": "$2a$10$3HdDite5vdm1T5lVIHu..OXdLoBxRIsIw.gf6OI7Ztff34hJ/dotC",
          "email": "admin@email.com"
      },
      {
          "id": 7,
          "username": "Benedict",
          "password": "$2a$10$KCAhNOChS.YBR67fTmJcyuxgB2p6kOCB3HHQOyC0mg34PlNtE.nci",
          "email": "benedict@gmail.com"
      },
      {
          "id": 8,
          "username": "Marion",
          "password": "$2a$10$9KJzGKr.nPQ3iKpAxGGD6u2xwdk2c7OnLxiuk0Tcs5efSIqLOrlxq",
          "email": "marion@email.com"
      }
  ]
  ```
  
  ### Get a single user
  *method url*: `/api/users/:id`
  
  *http method*: **[GET]**
  
  #### Response
  ##### 200 (OK)
  
  ###### Example response
  ```
  [
    {
        "id": 8,
        "username": "Marion",
        "password": "$2a$10$9KJzGKr.nPQ3iKpAxGGD6u2xwdk2c7OnLxiuk0Tcs5efSIqLOrlxq",
        "email": "marion@email.com"
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
  ***
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
  ***
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
          "id": "5",
          "username": "Elliot",
          "email": "elliots@email.com",
          "password": "$2a$12$j5siY2dBHIwm.4CezXAtCOQdQ6bkwLufoKlJIw.yw2oFW.a81LAFy"
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
    "postName": "Weekend trip to Paris",
    "description": "I had the most wonderful time walking along the Seine!",
    "imageUrl": "https://loremflickr.com/g/320/240/paris",
    "userId": 1,
    "upvotes": [
        4,
        5
    ]
 },
]
```

***
### Get a single post
***
*method url*: `/api/posts/:id`

*http method*: **[GET]**

#### Response
##### 200 (OK)

###### Example response
```
{
    "id": 1,
    "postName": "Weekend trip to Paris",
    "description": "I had the most wonderful time walking along the Seine!",
    "imageUrl": "https://loremflickr.com/g/320/240/paris",
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
*method url*: `/api/posts/?userId=${userId}`

*http method*: **[GET]**

#### Response
##### 200 (OK)

###### Example response
```
[
  {
      "id": 1,
      "postName": "Weekend trip to Paris",
      "description": "I had the most wonderful time walking along the Seine!",
      "imageUrl": "https://loremflickr.com/g/320/240/paris",
      "userId": 1,
      "upvotes": [
          4,
          5
      ]
  }

]
```
***
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
    "postName": "Our trip to Venice",
    "imageUrl": "image link",
    "description": "I loved this square!",
  }
  ```

#### Response
##### 201 (Created)
###### Example Response
```
{
    "id": 2,
    "postName": "Our trip to Venice",
    "description": "I took this",
    "imageUrl": "image link",
    "userId": 1
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
***
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
    "postName": "my 8th birthday",
    "imageUrl": "image link",
    "description": "tbt
  }
  ```
#### Response
##### 200 (OK)
###### Example Response
```
  {
      "post": {
          "id": "2",
          "postName": "My 8th birthday",
          "imageUrl": "image link",
          "description": "tbt"
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
***
### Get upvotes for a post
***
*method url*: `/api/posts/upvotes/:postId (id of the post)`

*http method*: **[GET]**

#### Response
##### 200 (OK)
###### Example Response
```
{
  "success": true,
  "postId": "1",
  "upvotes": 2
}
```

##### 404 (Not Found)
###### Example Response
```
  {
    "message": "The post with the specified ID does not exist."
  }
```
***
### Upvote a Post
***
*method url*: `/api/posts/upvote/:postId/:userId`

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
    "userId": "8",
    "postId": "1"
  }
```

##### 500 (Internal Server Error)
###### Example Response
```
  {
    "errorMessage": "Like already in database"
  }
```
***
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
  "userId": "8",
  "postId": "1"
}
```

##### 500 (Internal Server Error)
###### Example Response
```
 {
   "errorMessage": "Like not in database"
 }
```
