import { message } from "antd";

export const dva = {
  config: {
    onError(err: ErrorEvent): void {
      err.preventDefault();
    },
    namespacePrefixWarning: false,
  },
};


message.config({

  maxCount: 1,
});
