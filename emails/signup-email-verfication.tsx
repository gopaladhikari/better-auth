import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface VerificationEmailProps {
  name: string;
  url: string;
}

export function SignupEmailVerification({
  name,
  url,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="bg-white border border-gray-200 rounded-xl shadow-sm p-10 mx-auto max-w-md mt-10">
            <Section className="text-center mb-8">
              Auth Lift
              <Heading className="text-2xl font-bold text-gray-900">
                Welcome, {name}!
              </Heading>
            </Section>

            <Text className="text-gray-600 text-base leading-relaxed">
              You&apos;re almost ready to start. Please verify your
              email address by clicking the button below:
            </Text>

            <Section className="my-8 text-center">
              <Button
                href={url}
                className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-base no-underline"
              >
                Verify Email Address
              </Button>
            </Section>

            <Text className="text-gray-500 text-sm">
              Or copy and paste this link:
              <br />
              <a href={url} className="text-blue-600 break-all">
                {url}
              </a>
            </Text>

            <Text className="text-gray-400 text-xs mt-8 text-center">
              If you didn&apos;t create an account, you can safely
              ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
