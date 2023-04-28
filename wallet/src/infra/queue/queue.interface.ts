export type MessageJson = {
  Name: string;
  Payload: any;
};

export interface Queue {
  connect(): Promise<void>;
  on(queueName: string, callback: (input: any) => any): Promise<void>;
  publish(queueName: string, eventName: string, payload: any): Promise<void>;
}
