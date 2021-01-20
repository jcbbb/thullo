import { Request, Response, NextFunction } from 'express';
import { HttpContext, HttpCtxOpts } from './http-context';
import { HttpRequestEvent, HttpRequestEventOpts } from './http-request-event';
import { HttpResponseEvent, HttpResponseEventOpts } from './http-response-event';
import { logger } from './logger';
import { Client } from '@elastic/elasticsearch';
import config from '../config';

const elastic_client = new Client({ node: config.elastic_search_uri });

type LoggerOpts = {
  capture_request_body: boolean;
  capture_response_body: boolean;
};

type Metadata = {
  timestamp: string;
  context: {
    http: HttpCtxOpts;
  };
  events: {
    http_request_event?: HttpRequestEventOpts;
    http_response_event?: HttpResponseEventOpts;
  };
};

export const global_logger = (opts: LoggerOpts) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.start_time = new Date().getTime();

    const {
      headers: { host, ...headers },
      method,
      request_id,
      path,
      protocol,
      body: reqBody,
      query,
      connection,
    } = req;

    // determine the ip address of the client
    // https://stackoverflow.com/a/10849772
    const remote_addr = headers['x-forwarded-for'] || connection.remoteAddress;

    let body =
      opts.capture_request_body && Object.keys(reqBody).length > 0
        ? JSON.stringify(reqBody)
        : undefined;

    const http_context = new HttpContext({
      method,
      remote_addr,
      request_id,
      path,
    });

    const http_request_event = new HttpRequestEvent({
      direction: 'incoming',
      body,
      host,
      path,
      method,
      protocol,
      query,
      request_id,
      headers,
    });

    const metadata: Metadata = {
      timestamp: new Date().toISOString(),
      context: {
        http: http_context,
      },
      events: {
        http_request_event,
      },
    };

    const end = res.end;
    res.end = (async (chunk: any, encoding: BufferEncoding) => {
      res.end = end;
      res.end(chunk, encoding);

      const resBody = opts.capture_response_body ? JSON.parse(chunk) : undefined;
      const status_code = res.statusCode;

      const time_ms = new Date().getTime() - req.start_time;

      const http_response_event = new HttpResponseEvent({
        direction: 'outgoing',
        body: resBody,
        status_code,
        time_ms,
        request_id,
        headers: res.getHeaders(),
      });

      metadata.events = {
        ...metadata.events,
        http_response_event,
      };

      await elastic_client.index({
        index: 'thullo-logs',
        body: metadata,
      });

      const message = `${method} ${host}${path} - ${status_code} in ${time_ms}ms`;

      logger.info(message);
    }) as any;
    next();
  };
};
