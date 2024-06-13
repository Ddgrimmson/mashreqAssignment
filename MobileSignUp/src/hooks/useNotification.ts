import { useEffect } from "react";
import { fcmService } from "../services/GCMServices";
import { Alert } from "react-native";

const useNotification = () => {
    useEffect(() => {
        console.log("Registering FCMService")
        fcmService.register(
          (token) => {
            console.log("[App] onRegister: ", token);
          },
          (notification) => {
            console.log("[App] onNotification: ", notification);
            Alert.alert('A new FCM message arrived!', JSON.stringify(notification));
          },
          (notification) => {
            console.log("[App] onOpenNotification: ", notification);
            Alert.alert('Notification caused app to open from quit state', JSON.stringify(notification));
          }
        );
    
        return () => {
          fcmService.deleteToken();
        };
      }, []);
}
 
export default useNotification;