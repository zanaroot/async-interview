import { relations } from 'drizzle-orm';
import { pgTable } from 'drizzle-orm/pg-core';
import { InterviewStatusEnum, QuestionStatusEnum } from './enums';
import { OrganizationTable } from './organization';

export const QuestionTable = pgTable('question', (t) => ({
  id: t
    .varchar('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  value: t.varchar('value').notNull(),
  organizationId: t
    .varchar('organization_id')
    .notNull()
    .references(() => OrganizationTable.id),
  order: t.integer('order').default(1).notNull(),
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),


}));

export const CandidateTable = pgTable('candidate', (t) => ({
  id: t.serial('id').primaryKey(),
  name: t.varchar('name').notNull(),
  email: t.varchar('email').notNull(),
  phone: t.varchar('phone').notNull(),
  address: t.varchar('address').notNull(),
  title: t.varchar('title').notNull(),
  resume: t.varchar('resume'),
  observation: t.text('observation'),
  organizationId: t
    .varchar('organization_id')
    .notNull()
    .references(() => OrganizationTable.id, { onDelete: 'cascade' }),
}));

export const InterviewTable = pgTable('interview', (t) => ({
  id: t.serial('id').primaryKey(),
  name: t.varchar('name').notNull(),
  description: t.varchar('description'),
  candidateId: t
    .serial('candidate_id')
    .notNull()
    .references(() => CandidateTable.id),
  organizationId: t
    .varchar('organization_id')
    .notNull()
    .references(() => OrganizationTable.id, { onDelete: 'cascade' }),
  password: t.varchar('password', { length: 255 }).notNull(),
  token: t.varchar('token', { length: 255 }).notNull(),
  createdAt: t
    .timestamp('created_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .$defaultFn(() => new Date()),
  expiresAt: t
    .timestamp('expires_at', { withTimezone: true, mode: 'date' })
    .notNull(),
  status: InterviewStatusEnum('interview_status').default('sent'),
}));

export const AnswerTable = pgTable('answer', (t) => ({
  id: t
    .varchar('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  value: t.varchar('value'),
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
}));

export const InterviewQuestionTable = pgTable('interview_question', (t) => ({
  id: t
    .varchar('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  interviewId: t
    .serial('interview_id')
    .notNull()
    .references(() => InterviewTable.id, { onDelete: 'cascade' }),
  questionId: t
    .varchar('question_id')
    .notNull()
    .references(() => QuestionTable.id, { onDelete: 'cascade' }),
  answerId: t
    .varchar('answer_id')
    .references(() => AnswerTable.id, { onDelete: 'cascade' }),
  status: QuestionStatusEnum('status').default('pending'),
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
}));

export const InterviewQuestionRelations = relations(
  InterviewQuestionTable,
  ({ one }) => ({
    question: one(QuestionTable, {
      fields: [InterviewQuestionTable.questionId],
      references: [QuestionTable.id],
    }),
    interview: one(InterviewTable, {
      fields: [InterviewQuestionTable.interviewId],
      references: [InterviewTable.id],
    }),
    answer: one(AnswerTable, {
      fields: [InterviewQuestionTable.answerId],
      references: [AnswerTable.id],
    }),
  })
);

export const InterviewRelations = relations(InterviewTable, ({ one }) => ({
  organization: one(OrganizationTable, {
    fields: [InterviewTable.organizationId],
    references: [OrganizationTable.id],
  }),
  candidate: one(CandidateTable, {
    fields: [InterviewTable.candidateId],
    references: [CandidateTable.id],
  }),
}));

export const QuestionRelations = relations(QuestionTable, ({ one }) => ({
  organization: one(OrganizationTable, {
    fields: [QuestionTable.organizationId],
    references: [OrganizationTable.id],
  }),

}));
