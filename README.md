# Trading Platform

#### A Personal Trading Management System

The Personal Trading Management System is a web application designed to empower users to manage their Trading activities seamlessly. 
Project Motive To provide users with free Trading services while leveraging user data for business insights. Key features include:

<hr>

#### Core Features ✅
 + Authentication
 + Role-Based Permission System
 + User Management
 + Account Management
 + Dues Management
 + Dues Tracking
 + Task Scheduling for Expired Dues
 + Profit and Loss Tracking
 + Live Notifications Using Socket.io
 + Automatic Email Notifications for Expired Dues
 + Enhanced Security via Key Lock Pattern Implementation
 + Advanced Filtering System
 + Dues Records Generation
 + Profile Update & Password Change
 + Optimized API Response Using Caching, Pagination, and Database Indexing
 + HATEOAS Links Implementation
 + Unit and Integration Testing

<hr>

#### Tech Stack
Server : TypeScript ,  Node js , Express js , MongoDb , MailGun , Socket.io , Zod , CronJob , Jest

#### Api Reference
---

##### Get All Dues

```
GET api/v1/dues
```
| Parameter        |     Types        |   Description                           |
| -----------------|------------------|-----------------------------------------|
| `access_token `  | `Bearer_token`   | Required : Authorization Header         |
| `page `          | `Number`         | Not Required : Default 1                |
| `limit `         | `Number`         | Not Required : Default 10               |
| `sortBy`         | `String`         | Not Required : Deafult expiredDate      |
| `sortType`       | `String`         | Not Required : Default asc              |
| `searchBy`       | `String`         | Not Required : Default sellerName       |
| `populate`       | `String`         | Not Required : Populare relational data | 

##### Get a single due 

```
GET api/v1/dues/:{id}
```
| Parameter   | Type     | Description                             |
|-------------|----------|-----------------------------------------|
| `id`        | `String` | Required : Id of due to fetch           |
|`populate`   | `String` | Not Required : Populate relational data |


##### Update or create a new due

```
PUT /api/v1/dues/:{id}
```

| Parameter        | Type        | Description                    |
|------------------|-------------| --------------------------------|
|`id`              | `String`    | Required : Id of due to update |


##### Updateing existing due 

```
PATCH /api/v1/dues/:{id}
```

| Parameter | Type     | Description                           | 
|-----------|----------|---------------------------------------|
|`id`       |`String`  |Required : Id of due to partial update |
|`data`     |`String`  |Required: Data of the field to update  |

##### Delete a due 

```
DELETE /api/v1/dues/:{id}
```

| Parameter   | Type    | Description                    |
|-------------|---------|--------------------------------|
| `id`        | `String`| Required : Id of due to delete |

### Environment Variables
<hr>

To run this project, you will need to add the following environment variables to your .env file

`SERVER_PORT` In which port your app will run on local mechine

`SITE_URL` Main Site URL like: http://localhost:4000

`API_BASE_URL` API Base URL Like: http://localhost:4000/api/v1

`JWT_SECRET` JWT Token Secret for creating access & refresh Token

`MONGOOSE_STRING` MongoDB Connection String

`SMTP_USER` SMTP Server User for sending mail

`SMTP_PASS` SMTP Server Password

`SITE_MAIL` From which Mail your app mail will send

`SITE_Name` Application Name

### Run Locally
<hr>

##### Clone the project
```
git clone https://github.com/123Somrat/khaja_ajmir_traders_backend.git
```
##### Go to the project directory

```
cd my_project
```
##### Install dependencies 

```
npm install 
```
##### Start the server
```
npm run start
```
##### For test 
```
npm run test
```
### Support 
##### For support , email [mdjafaruddinsomrat@gmail.com](mailto:mdjafaruddinsomrat@gmail.com)
