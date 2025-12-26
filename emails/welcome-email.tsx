// Create welcome email

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
  Button,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to your account</Preview>
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
                Welcome to Better auth
              </Heading>
            </Section>

            <Text className="text-gray-600 text-base leading-relaxed">
              Hi {name}, you have successfully signed up to your
              account. You can now log in and start using our app.
            </Text>

            <Button
              href="http://localhost:3000/login"
              className="bg-red-600 text-white font-semibold py-3 px-8 rounded-lg text-base no-underline"
            >
              Login
            </Button>
            <Text className="text-gray-500 text-sm">
              If you have any questions, please don&apos;t hesitate to
              contact us at support@example.com.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
