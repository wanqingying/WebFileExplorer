import ax from "axios";
import { message } from "antd";

export const request = ax.create({});

request.interceptors.response.use((res) => {
  if (res.data?.code !== 0) message.error(res.data?.msg).then();
  return res.data;
});
