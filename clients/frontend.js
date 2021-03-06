import { useState, useEffect, useRef } from 'react';

//https://github.com/Upmostly/react-hooks-infinite-scroll

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ||
      isFetching
    ) {
      setIsFetching(true);
    }
  }

  return [isFetching, setIsFetching];
};

// https://stackoverflow.com/a/53180013/8589328

var useUpdate = (fn, inputs) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, inputs);
};

// https://pt-br.reactjs.org/docs/hooks-custom.html

var index = { useUpdate, useInfiniteScroll, useUpdate };

export { index as hooks };
