import {messaging} from '../config/firebase';

class FCMService {
  register = (
    onRegister: (token: string) => void,
    onNotification: (message: any) => void,
    onOpenNotification: (message: any) => void,
  ) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  checkPermission = async (onRegister: (token: string) => void) => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Calling get token', enabled);
        this.getToken(onRegister);
    } else {
      this.requestPermission(onRegister);
    }
  };

  getToken = async (onRegister: (token: string) => void) => {
    const fcmToken = await messaging().getToken();
    console.log('fcmtoken', fcmToken);
    if (fcmToken) {
      onRegister(fcmToken);
    } else {
      console.log('Failed to get FCM token');
    }
  };

  requestPermission = async (onRegister: (token: string) => void) => {
    try {
      await messaging().requestPermission();
        this.getToken(onRegister);
    } catch (error) {
      console.log('Permission rejected');
    }
  };

  deleteToken = async () => {
    try {
      await messaging().deleteToken();
      console.log('Token deleted');
    } catch (error) {
      console.log('Failed to delete token');
    }
  };

  createNotificationListeners = (
    onRegister: (token: string) => void,
    onNotification: (message: any) => void,
    onOpenNotification: (message: any) => void,
  ) => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      if (remoteMessage) {
        onOpenNotification(remoteMessage);
      }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          onOpenNotification(remoteMessage);
        }
      });

    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      if (remoteMessage) {
        onNotification(remoteMessage);
      }
    });

    messaging().onTokenRefresh(fcmToken => {
      console.log('New token: ', fcmToken);
      onRegister(fcmToken);
    });
  };
}

export const fcmService = new FCMService();
