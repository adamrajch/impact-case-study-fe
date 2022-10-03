/* eslint-disable react/no-children-prop */
import { Card, createStyles, Stack, Text, Title } from '@mantine/core';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import HomeHeader from '../components/header/Header';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: 80,
    paddingBottom: 50,
  },

  item: {
    display: 'flex',
  },

  itemIcon: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.md,
    border: 'none',
  },

  itemTitle: {
    marginBottom: theme.spacing.xs / 2,
  },

  supTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 800,
    fontSize: theme.fontSizes.sm,
    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
      .color,
    letterSpacing: 0.5,
  },

  title: {
    lineHeight: 1,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },

  description: {
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },

  highlight: {
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
    padding: 5,
    paddingTop: 0,
    borderRadius: theme.radius.sm,
    display: 'inline-block',
    color: theme.colorScheme === 'dark' ? theme.white : 'inherit',
  },
}));
interface HomePageProps {
  sectors: {
    id: number;
    Title: string;
    text: any;
  }[];
}

const Home = ({ sectors }: HomePageProps) => {
  const { classes } = useStyles();

  console.log(sectors);
  const items = [
    {
      key: 'TypeScript',
      desc: 'Industry standard for static typing, better DX, and catch errors in the IDE vs at build time',
      aC: 'indigo',
      bc: 'cyan',
    },
    {
      key: 'NextJS',
      desc: 'Optimized framework for React. Performative features such as Edge functions, SSR, SSG, ISR, Analytics',
      aC: 'grape',
      bc: 'red',
    },
    {
      key: 'Strapi CMS',
      desc: 'Headless CMS to manage complex relational data to markup for your pages',
      aC: 'purple',
      bc: 'pink',
    },
    {
      key: 'Storybook',
      desc: 'Build components in isolation to create a solid design system and control quality',
      aC: 'pink',
      bc: 'orange',
    },
  ];
  return (
    <>
      <HomeHeader />
      <Stack style={{ textAlign: 'center' }}>
        <Title style={{ fontSize: '3.5em' }}>Impact Case Study</Title>
        <Text color="dimmed">
          This app demonstates potential architecture, features, and
          optimizations using modern frameworks and industry standards
        </Text>
        <Stack align="center">
          <ul>
            <Stack style={{ textAlign: 'left' }} sx={{ maxWidth: '600px' }}>
              {items.map(({ key, desc, aC, bc }) => (
                <li key={key}>
                  <Text size="lg" className={classes.itemTitle}>
                    <Text
                      component="span"
                      weight={700}
                      variant="gradient"
                      gradient={{ from: aC, to: bc, deg: 45 }}
                    >
                      {key}:{' '}
                    </Text>
                    {desc}
                  </Text>
                </li>
              ))}
            </Stack>
          </ul>
        </Stack>
        <Stack style={{ textAlign: 'left' }} align="center" my={20}>
          {sectors.map(({ id, Title, text }) => (
            <Card
              withBorder
              radius="md"
              p="xl"
              shadow="sm"
              sx={{ maxWidth: '500px' }}
              key={id}
            >
              <Text
                size="xl"
                className={classes.title}
                weight={500}
                variant="gradient"
                gradient={{ from: 'pink', to: 'orange', deg: 130 }}
              >
                {Title}
              </Text>

              <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
            </Card>
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default Home;

// Home.getLayout = (page) => {
//   return <PrimaryLayout>{page}</PrimaryLayout>;
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const baseURL =
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
  const { data } = await axios.get(baseURL + '/api/techs?populate=%2A');
  const sectors = data.data[0].attributes.sectors;
  console.log(sectors);

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      sectors: sectors,
    },
  };
};
