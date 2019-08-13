import { Router } from 'express';
import Controller from '../controller/notification';
import Validation from '../validation/notification';
const router = Router();


router.post('/notification', Validation.notification, Controller.sendNotification);
router.post('/notifications', Validation.notifications, Controller.notifications);
router.post('/seenNotifications', Controller.seenNotifications);

export default router;