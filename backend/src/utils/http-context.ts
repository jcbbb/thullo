export type HttpCtxOpts = {
  method: string;
  path: string;
  remote_addr: string | string[] | undefined;
  request_id: string | string[];
};

export class HttpContext {
  static keyspace = 'http';
  method: string;
  path: string;
  remote_addr: string | string[] | undefined;
  request_id: string | string[];

  constructor({ method, path, remote_addr, request_id }: HttpCtxOpts) {
    this.method = method;
    this.path = path;
    this.remote_addr = remote_addr;
    this.request_id = request_id;
  }
}
