import { pgEnum } from 'drizzle-orm/pg-core';

export const UserRoleEnum = pgEnum('user_role', ['customer', 'admin']);

export const InterviewStatusEnum = pgEnum('interview_status', [
  'sent',
  'pending',
  'ongoing',
  'done',
]);

export const QuestionStatusEnum = pgEnum('question_status', [
  'pending',
  'done',
]);

export const StatusEnum = pgEnum('status', ['read', 'dismiss']);
