import { OutgoingHttpHeaders } from 'http';

export type HttpResponseEventOpts = {
  direction: 'incoming' | 'outgoing';
  body: any;
  request_id: string | string[];
  status_code: number;
  time_ms: number;
  headers: OutgoingHttpHeaders;
};

export class HttpResponseEvent {
  body: any;
  direction: 'incoming' | 'outgoing';
  request_id: string | string[];
  status_code: number;
  time_ms: number;
  headers: OutgoingHttpHeaders;

  constructor({
    body,
    direction,
    request_id,
    status_code,
    time_ms,
    headers,
  }: HttpResponseEventOpts) {
    this.body = body;
    this.direction = direction;
    this.request_id = request_id;
    this.status_code = status_code;
    this.time_ms = time_ms;
    this.headers = headers;
  }
}
