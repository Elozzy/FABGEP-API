# FABGEP-API
The Kwara Food and Agricultural Business Growth Enhancement Program - KW-FABGEP is a Private - Public partnership initiative designed to drive development in the food and agricultural sector, primarily through education to ensure growth and sustainable development in the state


## List of End-Points 

 ###### End point with " * " signifies completion 

- /signup: create a new user account *
- /login: authenticate existing user *
- /user: fetch a existing user account data *
- /purse: fetch a user account purse *
- /updatePurse: update a user purse
- /createInvestment: create a new investment package
- /getPackages: fetch all available investment packages
- /getUserInvestment: fetch a investment package of a user
- /getAllUserInvestment: fetch all user investment packages
- /addCard: add a new card details to user account
- /getCard: fetch a user card details 



### Standard API response format
```
{
"status": [boolean] - Only true if the details provided could be processed and no error occured while processing,
"message": [string] - Explains why status is false... Entirely informational. Please only log this but do not use for your checks,
"data": [object] - contains actionable result of processing if present
}
```
