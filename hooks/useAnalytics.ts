import analytics from "@react-native-firebase/analytics";

export const useAnalytics = () => {
  const logScreenView = async (screenName: string) => {
    await analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenName,
    });
  };

  const logEvent = async (eventName: string, params?: Record<string, any>) => {
    await analytics().logEvent(eventName, params);
  };

  const setUserProperty = async (name: string, value: string) => {
    await analytics().setUserProperty(name, value);
  };

  return { logScreenView, logEvent, setUserProperty };
};
