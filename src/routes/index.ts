import express from 'express'
import {controller  as dueController} from '../api/v1/Due';
import requestValidateSchema from '../middleware/validationSchema';

const router = express.Router()

router.route('/api/v1/dues')
.get(dueController.allDues)
.post(requestValidateSchema,dueController.createDue)

export default router;