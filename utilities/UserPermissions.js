import Constants from "expo-constants";
import * as permissions from "expo-permissions";

class UserPermissions {
  getCameraPermission = async () => {
    if (Constants.platform.android) {
      const { status } = await permissions.askAsync(permissions.CAMERA_ROLL);

      if (status !== "granted") {
        alert("we need permission to use your camera roll");
      }
    }
  };
}

export default new UserPermissions();
