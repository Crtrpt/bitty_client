import * as mqtt from "mqtt/dist/mqtt.min";
import { MqttClient } from "mqtt/dist/mqtt.min";
var client: MqttClient;

export const mqttInit = (options: any) => {
  client = mqtt.connect(import.meta.env.VITE_MQTT);
  client.on("connect", () => {
    console.log("订阅:" + options.topic);
    client.subscribe(options.topic);
    options.connect(client);
  });
  client.on("message", options.message);
  client.on("disconnect", options.disconnect);
};

export const mqttSubject = (topic: string) => {};
