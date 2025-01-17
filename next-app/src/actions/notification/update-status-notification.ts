'use server';

import { NotificationsModel } from '@/models/notifications';

export const updateStatusNotificationMutation = async (
  notificationId: number
) => {
  const notificationModel = new NotificationsModel();

  const updatestatusnotification =
    await notificationModel.updateStatusNotification(notificationId);

  return updatestatusnotification;
};
