import { ParsedQs } from 'qs';
import { IncomingHttpHeaders } from 'http';

export type HttpRequestEventOpts = {
  body: any;
  direction: 'incoming' | 'outgoing';
  host: string | undefined;
  method: string;
  path: string;
  query: ParsedQs;
  request_id: string | string[];
  protocol: string;
  headers: IncomingHttpHeaders;
};

export class HttpRequestEvent {
  body: any;
  direction: 'incoming' | 'outgoing';
  host: string | undefined;
  method: string;
  path: string;
  query: ParsedQs;
  request_id: string | string[];
  protocol: string;
  headers: IncomingHttpHeaders;

  constructor({
    body,
    direction,
    host,
    method,
    path,
    query,
    request_id,
    protocol,
    headers,
  }: HttpRequestEventOpts) {
    this.body = body;
    this.direction = direction;
    this.host = host;
    this.method = method;
    this.path = path;
    this.query = query;
    this.request_id = request_id;
    this.protocol = protocol;
    this.headers = headers;
  }
}
