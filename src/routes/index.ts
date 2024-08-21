import express from 'express'
import {controller  as dueController} from '../api/v1/Due';
import requestValidateSchema from '../middleware/validationSchema';
import dueValidationSchma from '../models/due/dueValidationSchema';

const router = express.Router()

router.route('/api/v1/dues')
.get(dueController.allDues)
.post(requestValidateSchema(dueValidationSchma),dueController.createDue)

export default router;