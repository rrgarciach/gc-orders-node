import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpHeaderNormalizer from '@middy/http-header-normalizer';

export function commonHandler(handler) {
  return middy(handler)
    .use(httpHeaderNormalizer())
    .use(httpJsonBodyParser());
}
