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
| Parameter                   |     Types                        |   Description                           |
| ---                         |      ---                         |   ---                                   |
| <mark> access_token </mark> |  <mark>    Bearer_token </mark>  | Required : Authorization Header         |
| <mark> page        </mark>  |  <mark>  Number       </mark>    | Not Required : Default 1                |
| <mark> limit       </mark>  |  <mark>   Number      </mark>    | Not Required : Default 10               |
| <mark> sortBy      </mark>  |  <mark>    String     </mark>    | Not Required : Deafult expiredDate      |
| <mark> sortType   </mark>   |  <mark>    String     </mark>    | Not Required : Default asc              |
| <mark> searchBy   </mark>   |  <mark>    String     </mark>    | Not Required : Default sellerName       |
| <mark> populate     </mark> |  <mark>    String     </mark>    | Not Required : Populare relational data | 
