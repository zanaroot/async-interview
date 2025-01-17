import { relations } from 'drizzle-orm';
import { pgTable } from 'drizzle-orm/pg-core';
import { OrganizationTable } from './organization';

export const QuestionTableTemplate = pgTable('questionTemplate', (t) => ({
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

export const templateTable = pgTable('template', (t) => ({
  id: t
    .varchar('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: t.varchar('name').notNull(),
  description: t.varchar('description'),
  organizationId: t
    .varchar('organization_id')
    .notNull()
    .references(() => OrganizationTable.id),
  createdAt: t
    .timestamp('created_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .$defaultFn(() => new Date()),
}));

// Table de jointure entre Template et Questions
export const TemplateQuestionTable = pgTable('template_question', (t) => ({
  id: t
    .varchar('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  templateId: t
    .varchar('template_id')
    .notNull()
    .references(() => templateTable.id, { onDelete: 'cascade' }),
  questionId: t
    .varchar('question_id')
    .notNull()
    .references(() => QuestionTableTemplate.id, { onDelete: 'cascade' }),
  order: t.integer('order').default(1).notNull(),
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
}));

// Relations pour Template
export const TemplateRelations = relations(templateTable, ({ many }) => ({
  questions: many(TemplateQuestionTable),
}));

// Relations pour Question
export const QuestionTemplateRelations = relations(
  QuestionTableTemplate,
  ({ many, one }) => ({
    templates: many(TemplateQuestionTable),
    organization: one(OrganizationTable, {
      fields: [QuestionTableTemplate.organizationId],
      references: [OrganizationTable.id],
    }),
  })
);

// Relations pour la table de jointure
export const TemplateQuestionRelations = relations(
  TemplateQuestionTable,
  ({ one }) => ({
    template: one(templateTable, {
      fields: [TemplateQuestionTable.templateId],
      references: [templateTable.id],
    }),
    question: one(QuestionTableTemplate, {
      fields: [TemplateQuestionTable.questionId],
      references: [QuestionTableTemplate.id],
    }),
  })
);
