# FABGEP-API

The Kwara Food and Agricultural Business Growth Enhancement Program - KW-FABGEP is a Private - Public partnership initiative designed to drive development in the food and agricultural sector, primarily through education to ensure growth and sustainable development in the state

## List of End-Points

###### End point with " \* " signifies completion

- /signup: create a new user account \*
- /login: authenticate existing user \*
- /user: fetch a existing user account data \*
- /purse: fetch a user account purse \*
- /notification: post a new notification \*
- /notifications: fetch all user notification \*
- /transactions: fetch all user transaction's \*
- /transfer: send money from user to another purse account \*
- /createInvestment: create a new investment package
- /getPackages: fetch all available investment packages
- /getUserInvestment: fetch a investment package of a user
- /getAllUserInvestment: fetch all user investment packages
- /addCard: add a new card details to user account
- /getCard: fetch a user card details

### Standard API response format

```json
{
"status": [boolean] - Only true if the details provided could be processed and no error occured while processing,
"message": [string] - Explains why status is false... Entirely informational. Please only log this but do not use for your checks,
"data": [object] - contains actionable result of processing if present
}
```

## EndPoints

### POST: /api/v1/transactions

returns an array of user transaction's from database

#### Mongo Query Details

collection: _transaction_

Query:

```json
{
  "uid": ""[String]
}
```

##### request prams (optional)

```json
{
  "limit": (5)[int] // numbers of items to retrieve. if [null] of [0] return all document
}
```

##### response: 200

```json
{
  "status": true[boolean],
  "message": "success"[string],
  "data": [][Array]
}
```

### POST: /api/v1/investments

returns an array of user investments from database

#### Mongo Query Details

collection: _investment_

Query:

```json
{
  "uid": ""[String]
}
```

##### request prams: NONE

##### response: 200

```json
{
  "status": true[boolean],
  "message": "success"[string],
  "data": [][Array]
}
```

### GET: /api/v1/packages

returns an array of available packages from database

#### Mongo Query Details

collection: _packages_

Query:

```json
{
  "status": true
}
```

##### request prams: NONE

##### response: 200

```json
{
  "status": true[boolean],
  "message": "success"[string],
  "data": [][Array]
}
```
