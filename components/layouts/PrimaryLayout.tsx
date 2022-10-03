import { Container } from '@mantine/core';
import Head from 'next/head';
import HomeHeader from '../header/Header';

export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {}
const links = [
  {
    label: 'Build',
    link: '/build',
  },
  {
    label: 'CI/CD',
    link: '/cicd',
  },
];
const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children, ...divProps }) => {
  return (
    <>
      <Head>
        <title>Impact Case Study</title>
      </Head>
      <Container size="xl">
        <div {...divProps}>
          <HomeHeader />
          <main>{children}</main>
        </div>
      </Container>
    </>
  );
};

export default PrimaryLayout;
