import React from 'react';
import jsonp from 'jsonp';

export const Status = {
  idle: 'IDLE',
  loading: 'LOADING',
  success: 'SUCCESS',  
  error: 'ERROR'
};

function toQueryString(params) {
  return Object.keys(params)
    .map((key) => key + "=" + encodeURIComponent(params[key]))
    .join("&");
}

export function useMailChimp(url) {
  const [status, setStatus] = React.useState(Status.idle);
  const [error, setError] = React.useState(null);
  const [value, setValue] = React.useState(null);

  const subscribe = React.useCallback((data) => {
    const params = toQueryString(data);
    const ajaxURL = url.replace("/post?", "/post-json?");
    const newUrl = ajaxURL + "&" + params;

    setError(null);
    setStatus(Status.loading);

    if (typeof jsonp !== 'function') {
      setStatus(Status.error);
      setError('JSONP is not available. Please ensure the jsonp package is installed and imported correctly.');
      return;
    }

    jsonp(newUrl, { param: "c" }, (err, data) => {
      if (err) {
        setStatus(Status.error);
        setError(err);
      } else if (data.result !== "success") {
        setStatus(Status.error);
        setError(data.msg);
      } else {
        setStatus(Status.success);
        setValue(data.msg);
      }
    });
  }, [url]);

  return { subscribe, status, error, value };
}