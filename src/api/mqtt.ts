import * as mqtt from "mqtt/dist/mqtt.min";
import { MqttClient, IClientOptions } from "mqtt/dist/mqtt.min";
var client: MqttClient;

export const mqttInit = (options: any) => {
  var opt: IClientOptions = {
    clientId: options.clientId,
  };
  client = mqtt.connect(import.meta.env.VITE_MQTT, opt);
  client.on("connect", () => {
    console.log("订阅:" + options.topic);
    client.subscribe(options.topic);
    options.connect(client);
  });
  client.on("message", options.message);
  client.on("disconnect", options.disconnect);
};

export const mqttSubject = (topic: string) => {
  console.log("订阅" + topic);
  client.subscribe(topic);
};

export const mqttPublish = (topic: string, payload: any) => {
  console.log("发布" + topic);
  client.publish(topic, payload);
};

export const mqttUnsubscribe = (topic: string) => {
  console.log("取消订阅" + topic);
  client.unsubscribe(topic);
};
