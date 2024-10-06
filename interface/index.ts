export interface auth {
    body: {
        email: string,
        password: string,
    }
};
interface BodyData {
    __collector: object;
    blobId: string;
    offset: number;
    size: number;
  }
  
  interface BodyBlob {
    _data: BodyData;
  }
  
  interface Headers {
    "access-control-allow-origin": string;
    connection: string;                    
    "content-length": string;
    "content-type": string; 
    date: string;
    etag: string;                          
    "keep-alive": string;                  
    "x-powered-by": string;                 
    authorization?: string;                 
    "content-encoding"?: string;           
  }
  
  export interface ApiResponse {
    _bodyBlob: BodyBlob;
    _bodyInit: BodyBlob;
    bodyUsed: boolean;
    headers: Headers;
    ok: boolean;
    status: number;
    statusText: string;
    type: string;
    url: string;
    body: any;
  }
  