import express from 'express'
import {controller  as dueController} from '../api/v1/Due';
import { controller as expiredDueController } from '../api/v1/ExpiredDue';
import requestValidateSchema from '../middleware/validationSchema';
import dueValidationSchma from '../models/due/dueValidationSchema';


const router = express.Router()


// ** All Due related routes
router.route('/api/v1/dues')
.get(dueController.allDues)
.post(requestValidateSchema(dueValidationSchma),dueController.createDue)

// * for get patch put delete a single due
router.route('/api/v1/dues/:id')
.get(dueController.getSingleDue)


// * Expired Due related routes
router.route('/api/v1/expiredDues')
.get(expiredDueController.allExpiredDues)



export default router;