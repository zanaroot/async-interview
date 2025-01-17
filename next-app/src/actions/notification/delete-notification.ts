'use server';

import { NotificationsModel } from '@/models/notifications';

export const deleteNotificationMutation = async (notificationId: number) => {
  const notificationModel = new NotificationsModel();

  const deletenotification =
    await notificationModel.deleteNotification(notificationId);

  return deletenotification;
};
