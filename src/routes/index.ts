import express from 'express'
import {controller  as dueController} from '../api/v1/Due';

const router = express.Router()

router.route('/api/v1/addDue')
.get(dueController.addDue)

export default router;