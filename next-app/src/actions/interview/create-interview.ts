'use server';
import { getCandidateById } from '@/models/candidate/$get-candidate-by-id';
import { zInterviewInsert } from '@/models/interview/type';
import { QuestionModel } from '@/models/question';
import { db } from '@/packages/db';
import { getScopedI18n } from '@/packages/locales/server';
import { sendEmail } from '@/packages/mail';
import { candidateInvitationTemplate } from '@/packages/mail/templates/candidate-invitation';
import { getSession } from '@/server-functions/session';
import { InterviewModel } from '@/models/interview';

export interface CreateInterviewPayload {
  name: string;
  description: string;
  candidateId: number;
  expiresAt: Date;
  questions: {
    id: string;
    text: string;
    interviewTemplateId?:string | null;
  }[];
}

export const createInterviewMutation = async (data: CreateInterviewPayload) => {
  const tError = await getScopedI18n('server-error');
  const { organization: sessionOrg } = await getSession();

  if (!sessionOrg) {
    throw tError('not-authenticated');
  }

  const organizationId = sessionOrg.id;

  const candidate = await getCandidateById(data.candidateId, organizationId);

  if (!candidate) {
    throw tError('candidate-not-found');
  }

  const token = crypto.randomUUID();
  const password = crypto
    .getRandomValues(new Uint8Array(3))
    .reduce((acc, value) => acc + value.toString(16).padStart(2, '0'), '');
  const dataInterviewMutation = {
    name: data.name,
    description: data.description,
    candidateId: data.candidateId,
    organizationId: organizationId,
    password,
    token,
    expiresAt: data.expiresAt,
  };

  zInterviewInsert.parse(dataInterviewMutation);

  const result = await db.transaction(async (ctx) => {
    const questionModel = new QuestionModel(ctx);
    const interviewModel = new InterviewModel(ctx);

    const [interviewData] = await interviewModel.createInterview(
      dataInterviewMutation
    );

    const formattedQuestions = data.questions?.map((question, index) => ({
      value: question.text,
      organizationId: organizationId,
      interviewId: interviewData.id,
      order: index + 1,
      interviewTemplateId:question.interviewTemplateId?question.interviewTemplateId : null,

    }));

    const questions = await questionModel.create(formattedQuestions);

    const formattedQuestionRelations = questions.map((q) => ({
      questionId: q.id,
      interviewId: interviewData.id,
    }));

    await questionModel.createInterviewRelation(formattedQuestionRelations);

    return interviewData;
  });

  const template = candidateInvitationTemplate({
    token: result.token,
    candidateName: candidate.name,
    password: result.password,
    organizationName: sessionOrg.name,
    expiresAt: result.expiresAt,
  });

  const resultSend = await sendEmail(
    candidate.email,
    'Interview Invitation',
    template
  );

  return resultSend;
};
