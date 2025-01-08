import { env } from '@/env';

type Props = {
  token: string;
  candidateName: string;
  password: string;
  organizationName: string;
  expiresAt: Date;
};

export const candidateInvitationTemplate = ({
  token,
  candidateName,
  password,
  organizationName,
  expiresAt,
}: Props) => (
  <div
    style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
    }}
  >
    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
      <h1 style={{ color: '#2563eb', marginBottom: '20px' }}>
        Interview Invitation from {organizationName}
      </h1>
    </div>

    <div style={{ lineHeight: '1.6' }}>
      <p>Dear {candidateName},</p>

      <p>
        You have been invited to participate in an interview process with{' '}
        {organizationName}. We look forward to learning more about your
        experience and qualifications.
      </p>

      <div
        style={{
          background: '#f3f4f6',
          padding: '20px',
          borderRadius: '8px',
          margin: '24px 0',
        }}
      >
        <p style={{ fontWeight: 'bold', marginBottom: '15px' }}>
          Interview Access Details:
        </p>

        <p>Option 1: Click the direct access link below</p>
        <a
          href={`${env.NEXT_PUBLIC_URL}/invitation/${token}`}
          style={{
            display: 'inline-block',
            background: '#2563eb',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            marginBottom: '20px',
          }}
        >
          Access Your Interview
        </a>

        <p>Option 2: Use the following credentials</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            • Link:{' '}
            <a href={`${env.NEXT_PUBLIC_URL}/interview`}>
              {env.NEXT_PUBLIC_URL}/interview
            </a>
          </li>
          <li>
            • Password:{' '}
            <span
              style={{
                fontWeight: 'bold',
                background: '#e5e7eb',
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              {password}
            </span>
          </li>
        </ul>
      </div>

      <p style={{ color: '#dc2626' }}>
        Please note: This invitation expires on {expiresAt.toLocaleDateString()}
      </p>

      <div style={{ marginTop: '30px' }}>
        <p>Best regards,</p>
        <p>The {organizationName} Team</p>
      </div>

      <div
        style={{
          borderTop: '1px solid #e5e7eb',
          marginTop: '30px',
          paddingTop: '20px',
          fontSize: '0.875rem',
          color: '#6b7280',
        }}
      >
        <p>
          If you have any issues accessing the interview, please contact our
          support team.
        </p>
      </div>
    </div>
  </div>
);
