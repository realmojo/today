import React, {useState, useRef, useEffect} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {BottomTab} from './screens';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import useStore from './stores';
import {observer} from 'mobx-react';
import {QueryClient, QueryClientProvider} from 'react-query';
import analytics from '@react-native-firebase/analytics';
import {Login} from './screens/Login';
import {Edit} from './screens/Edit';
import {useQuery} from 'react-query';
import {LoadingIndicator} from './components';
import {getBirthData} from './api/login';
import {dataStore} from './stores/data';

const queryClient = new QueryClient();
const Stack = createStackNavigator();

const TotalStack = observer(() => {
  const {loginStore} = useStore();
  const [dataLoading, setDataLoading] = useState(true);

  const {isLoading} = useQuery('login', getBirthData, {
    // 성공시 호출
    onSuccess: async data => {
      console.log('logon data: ', data);
      if (data) {
        await dataStore.setData();
        loginStore.setIslogin(true);
      }
      setDataLoading(false);
    },
  });

  if (isLoading || dataLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      {!loginStore.isLogin ? (
        <Login />
      ) : (
        <Stack.Navigator initialRouteName="bottom-tab">
          <Stack.Screen
            name="bottom-tab"
            component={BottomTab}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="edit"
            component={Edit}
            options={{
              title: '설정',
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            }}
          />
        </Stack.Navigator>
      )}
    </>
  );
});

export default function App() {
  const routeNameRef = useRef();
  const navigationRef = useNavigationContainerRef();

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <QueryClientProvider client={queryClient}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              routeNameRef.current = navigationRef.current.getCurrentRoute()
                ? navigationRef.current.getCurrentRoute().name
                : undefined;
            }}
            onStateChange={async () => {
              const previousRouteName = routeNameRef.current;
              const currentRouteName =
                navigationRef.current.getCurrentRoute().name || 'Login';

              if (previousRouteName !== currentRouteName) {
                await analytics().logScreenView({
                  screen_name: currentRouteName,
                  screen_class: currentRouteName,
                });
              }
              routeNameRef.current = currentRouteName;
            }}
          >
            <TotalStack />
          </NavigationContainer>
        </ApplicationProvider>
      </QueryClientProvider>
    </>
  );
}
