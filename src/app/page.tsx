import React from "react";

import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  RevealFx,
  Arrow,
  Column,
  GlitchFx,
  SmartImage,
  LetterFx,
} from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";

import { baseURL, routes } from "@/app/resources";
import { home, about, person, newsletter } from "@/app/resources/content";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";

export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Home() {
  return (
    <Column maxWidth="l" gap="xl" horizontal="center" className="mt-80">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `https://${baseURL}`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Flex fillWidth gap="24" mobileDirection="column">
        <Column fillWidth maxWidth="s" className="mt-80">
          <RevealFx
            translateY="4"
            fillWidth
            horizontal="start"
            paddingBottom="m"
          >
            <Heading wrap="balance" variant="display-strong-m">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx
            translateY="8"
            delay={0.2}
            fillWidth
            horizontal="start"
            paddingBottom="m"
          >
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-xl"
            >
              {home.subline}
            </Text>
          </RevealFx>
        </Column>
        <Column maxWidth="s">
          <RevealFx speed="medium" delay={0} translateY={0} trigger>
            <GlitchFx fillWidth speed="medium">
              <Column center fillWidth gap="2">
                <SmartImage
                  src="/images/earth.webp"
                  alt="Earth"
                  aspectRatio="1 / 1"
                  maxWidth={24}
                  sizes="640px"
                />
                <Heading as="h2" align="center" variant="display-default-xs">
                  Welcome to {person.firstName} {person.lastName}
                </Heading>
                <Text
                  align="center"
                  variant="body-default-s"
                  onBackground="neutral-weak"
                >
                  <LetterFx
                    speed="medium"
                    trigger="instant"
                    charset={[
                      "X",
                      "@",
                      "$",
                      "a",
                      "H",
                      "z",
                      "o",
                      "0",
                      "y",
                      "#",
                      "?",
                      "*",
                      "0",
                      "1",
                      "+",
                    ]}
                  >
                    {person.description}
                  </LetterFx>
                </Text>
              </Column>
            </GlitchFx>
          </RevealFx>
        </Column>
      </Flex>

      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>
      {routes["/blog"] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex flex={1} paddingLeft="l">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Latest from the blog
            </Heading>
          </Flex>
          <Flex flex={3} paddingX="20">
            <Posts range={[1, 2]} columns="2" />
          </Flex>
        </Flex>
      )}
      <Projects range={[2]} />
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
