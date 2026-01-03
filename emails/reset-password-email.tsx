import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  name: string;
  url: string;
}

export function ResetPasswordEmail({
  name,
  url,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="bg-white border border-gray-200 rounded-xl shadow-sm p-10 mx-auto max-w-md mt-10">
            <Section className="text-center mb-8">
              <Img
                src={`${process.env.NEXT_PUBLIC_APP_URL}/logo.png`}
                alt="AuthLift"
                width="60"
                height="60"
                className="mx-auto mb-4"
              />
              <Heading className="text-2xl font-bold text-gray-900">
                Password Reset Request
              </Heading>
            </Section>

            <Text className="text-gray-600 text-base leading-relaxed">
              Hi {name}, we received a request to reset your password.
              Click the button below to set a new one:
            </Text>

            <Section className="my-8 text-center">
              <Button
                href={url}
                className="bg-red-600 text-white font-semibold py-3 px-8 rounded-lg text-base no-underline"
              >
                Reset Password
              </Button>
            </Section>

            <Text className="text-gray-500 text-sm">
              This link expires in 1 hour.
              <br />
              If you didn&apos;t request this, you can safely ignore
              this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
