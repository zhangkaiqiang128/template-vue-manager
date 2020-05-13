import axios from 'axios';
import {HTTP_BASE_URL} from "../config";

function RequestProxy(target) {
  const defaultTarget = function () {}
  defaultTarget.url = '/'

  const proxy = new Proxy(target || defaultTarget, {
    get: function(target, property, receiver) {
      const fn = target;
      fn.url = target ? fn.url : '';
      if (['get', 'post', 'put', 'delete'].indexOf(property) === -1) {
        fn.url = fn.url + '/' + property
        return new RequestProxy(fn)
      } else {
        return function (config) {
          const url = target.url;
          target.url = '/';
          return requestInstance.request({
            url,
            method: property,
            ...(config || {})
          })
        }
      }
    },
    apply(target, thisArg, argArray) {
      console.log(target, thisArg, argArray)
      console.log(target.url)
      const url = target.url;
      target.url = '/';
      return requestInstance.request({
        url,
        method: 'POST',
        ...(argArray[1] || {})
      })
    }
  });

  return proxy;
}

const requestInstance = axios.create({
  baseURL: HTTP_BASE_URL
});

export const request = requestInstance;
export const server = new RequestProxy();
