'use server';
import { NotificationsModel } from '@/models/notifications';
import { actionOrgSessionGuard } from '@/server-functions/session';

export const getallUserNotificationQuery = async () => {
  const session = await actionOrgSessionGuard();

  const notificationModel = new NotificationsModel();

  const allusernotification = await notificationModel.getAllUserNotification(
    session.userId,
    session.organizationId
  );

  return allusernotification;
};
