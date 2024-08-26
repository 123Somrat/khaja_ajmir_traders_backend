import express from 'express'
import {controller  as dueController} from '../api/v1/Due';
import requestValidateSchema from '../middleware/validationSchema';
import dueValidationSchma from '../models/due/dueValidationSchema';

const router = express.Router()

// for get all due and create a single due
router.route('/api/v1/dues')
.get(dueController.allDues)
.post(requestValidateSchema(dueValidationSchma),dueController.createDue)

// for get patch put delete a single due
router.route('/api/v1/dues/:id')
.get(dueController.getSingleDue)



export default router;