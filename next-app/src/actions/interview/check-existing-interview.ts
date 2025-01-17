'use server';

import { interviewByToken } from '@/server-functions/interview-by-token';
import { db } from '@/packages/db';
import { InterviewModel } from '@/models/interview';
import { QuestionModel } from '@/models/question';
import { NotificationsModel } from '@/models/notifications';

export const checkExistingInterview = async (token: string) => {
  const interviewModel = new InterviewModel(db);
  const questionModel = new QuestionModel(db);
  const notificationModel = new NotificationsModel(db);

  const t = await interviewByToken(token);

  if (!t) {
    return null;
  }

  if (t.status !== 'ongoing') {
    await interviewModel.updateStatusToPending(t.id);
  }

  if (t.status === 'ongoing') {
    const questions = await questionModel.getLowestPendingQuestion(token);

    if (!questions) {
      const notificaton = {
        values: 'status done',
        url: '/list',
        organizationId: t.organizationId,
      };

      await interviewModel.updateStatusToDone(t.id);
      const [createNotification] =
        await notificationModel.createNotification(notificaton);

      const userNotification = {
        userId: t.organization.ownerId,
        notificationId: createNotification.id,
      };
      await notificationModel.createUserNotification(userNotification);
      throw 'You have already answered all the questions';
    }
  }

  return t;
};
