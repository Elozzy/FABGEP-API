# KW-FABGEP-API
The Kwara Food and Agricultural Business Growth Enhancement Program - KW-FABGEP is a Private - Public partnership initiative designed to drive development in the food and agricultural sector, primarily through education to ensure growth and sustainable development in the state


## List of End-Points 


- /create: create a new user account
- /login: authenticate existing user
- /getUser: fetch a existing user account data
- /getPurse: fetch a user account purse
- /updatePurse: update a user purse
- /createInvestment: create a new investment package
- /getPackages: fetch all available investment packages
- /getUserInvestment: fetch a investment package of a user
- /getAllUserInvestment: fetch all user investment packages
- /addCard: add a new card details to user account
- /getCard: fetch a user card details 



### Endpoint respones format

```
{
    status: true,data: '',      // bool
    message: 'success' // String
    data: any          // contains request result
}
```