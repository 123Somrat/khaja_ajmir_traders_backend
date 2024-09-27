import express from 'express'
import {controller  as dueController} from '../api/v1/Due';
import { controller as expiredDueController } from '../api/v1/ExpiredDue';
import { controller as sellRecordController } from '../api/v1/SellRecords';
import { controller as userController } from '../api/v1/User';
import requestValidateSchema from '../middleware/validationSchema';
import dueValidationSchma from '../models/due/dueValidationSchema';
import zodUserValidationSchema from '../models/user/zodUserValidationSchema';
import authenticationMiddleWare from '../middleware/authenticationMiddleWare';


const router = express.Router()


// Auth route
router.route('/api/v1/register').post(requestValidateSchema(zodUserValidationSchema),userController.register)
router.route('/api/v1/login').post(userController.login)


// ** All Due related routes
router.route('/api/v1/dues')
.get(dueController.allDues)
.post(authenticationMiddleWare,requestValidateSchema(dueValidationSchma),dueController.createDue)

// * for get patch put delete a single due
router.route('/api/v1/dues/:id')
.get(authenticationMiddleWare,dueController.getSingleDue)


// * Expired Due related routes
router.route('/api/v1/expiredDues')
.get(expiredDueController.allExpiredDues)

// * for patch  delete a single expired due
router.route('/api/v1/expiredDues/:id')
.put(authenticationMiddleWare,expiredDueController.updateExpiredDueDate)
.patch(authenticationMiddleWare,expiredDueController.patchExpiredDues)


// * Get all sell Records
router.route('/api/v1/sellRecords')
.get(authenticationMiddleWare,sellRecordController.getAllSellRecords)


export default router;