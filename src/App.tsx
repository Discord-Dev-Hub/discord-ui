import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';

import { MainLayout } from './common/layouts/mainLayout/MainLayout';
import { ThemeProvider } from './common/providers';
import { ChatProvider } from './common/providers/ChatProvider';
import { environment } from './environments/environment';
import { routes } from './routes/routes';
import { onAppLoad } from './store/onAppLoad';
import { store } from './store/store';

export const App: React.FC = () => {
  const [ready, setReady] = useState(false);
  const appRoutes = useRoutes(routes);

  useEffect(() => {
    const loadApp = async () => {
      try {
        await onAppLoad();
      } finally {
        setReady(true);
      }
    };

    loadApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ChatProvider baseURL={environment.baseURL}>
          <MainLayout>{appRoutes}</MainLayout>
        </ChatProvider>
      </ThemeProvider>
    </Provider>
  );
};
