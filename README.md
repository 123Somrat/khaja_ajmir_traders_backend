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
  api/v1/dues
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
 api/v1/dues/:{id}
```
| Parameter   | Type     | Description                             |
|-------------|----------|-----------------------------------------|
| `id`        | `String` | Required : id of due to fetch           |
|`populate`   | `String` | Not Required : Populate relational data |


##### Update or create a new due

```
/api/v1/dues/:{id}
```

| Parameter        | Type        | Description                    |
|------------------|-------------| --------------------------------|
|`id`              | `String`    | Required : id of due to update |


##### Updateing existing due 

```
 /api/v1/dues/:{id}
```

| Parameter | Type     | Description                           | 
|-----------|----------|---------------------------------------|
|`id`       |`String`  |Required : id of due to partial update |
|`data`     |`String`  |Required: Data of the field to update  |


