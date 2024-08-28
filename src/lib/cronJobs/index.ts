import cron from 'node-cron';
import dueModel from '../../models/due/dueSchema';
import dayjs from 'dayjs';
import expiredDueModel from '../../models/expiredDue.ts/expiredDueSchema';



cron.schedule('*/1 * * * *',async()=>{
   console.log('Cron jobs running')

},{
    scheduled: true,
    timezone: "Europe/Berlin"
  })


