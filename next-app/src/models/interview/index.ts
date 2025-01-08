import { InterviewTable } from '@/packages/db/schemas';
import { and, eq } from 'drizzle-orm';
import { Core, type DBType } from '../Core';
import type { InsertInterview } from './type';

export * from './$get-list';
export * from './$get-one';

export class InterviewModel extends Core {
  constructor(ctx?: DBType) {
    super(ctx);
  }

  createInterview = async (data: InsertInterview) => {
    const interview = await this.db
      .insert(InterviewTable)
      .values(data)
      .returning();

    return interview;
  };

  updateStatusToPending = async (id: number) => {
    const interview = await this.db
      .update(InterviewTable)
      .set({ status: 'pending' })
      .where(eq(InterviewTable.id, id));

    return interview;
  };

  updateStatusToOngoing = async (id: number) => {
    const interview = await this.db
      .update(InterviewTable)
      .set({ status: 'ongoing' })
      .where(eq(InterviewTable.id, id));

    return interview;
  };

  updateStatusToDone = async (id: number) => {
    const interview = await this.db
      .update(InterviewTable)
      .set({ status: 'done' })
      .where(eq(InterviewTable.id, id));

    return interview;
  };

  getInterviewPassed = async (organizationId: string) => {
    const interviewPassed = await this.db.$count(
      InterviewTable,
      and(
        eq(InterviewTable.organizationId, organizationId),
        eq(InterviewTable.status, 'done')
      )
    );
    return interviewPassed;
  };

  getallInterview = async (organizationId: string) => {
    const allinterview = await this.db.$count(
      InterviewTable,
      eq(InterviewTable.organizationId, organizationId)
    );
    return allinterview;
  };
}
