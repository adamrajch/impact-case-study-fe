import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useState } from 'react';
import GlobalStyles from '../styles/Global';
import { NextPageWithLayout } from '../types/PageLayout';
import { rtlCache } from '../utils/rtl-cache';
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark');

  const toggleColorScheme = (value?: any) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
  };

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <div dir="rtl">
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: colorScheme,
          }}
          emotionCache={rtlCache}
        >
          <GlobalStyles />
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={router.route}
              initial="initialState"
              animate="animateState"
              exit="exitState"
              transition={{
                duration: 0.75,
              }}
              variants={{
                initialState: {
                  opacity: 0,
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                },
                animateState: {
                  opacity: 1,
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                },
                exitState: {
                  clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)',
                },
              }}
              className="base-page-size"
            >
              {getLayout(<Component {...pageProps} />)}
            </motion.div>
          </AnimatePresence>
        </MantineProvider>
      </div>
    </ColorSchemeProvider>
  );
}
