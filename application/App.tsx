import React, { FC } from 'react';
import {
  preloadCachingFetch,
  useCachingFetch,
} from '../caching-fetch-library/cachingFetch';
import Person from './Person';
import { validateData } from './validation';

import dotenv from 'dotenv';
dotenv.config();

type Application = FC & {
  preLoadServerData?: () => Promise<void>;
};

const App: Application = () => {
  const apiUrl: string = process.env.API_URL || '';
  const {
    data: rawData,
    isLoading,
    error,
  } = useCachingFetch(
    apiUrl,
  );
  if (isLoading) return <div>Loading...</div>;
  if (error || rawData === null) return <div>Error: {error?.message}</div>;

  const data = validateData(rawData);

  return (
    <div>
      <h1>Welcome to the People Directory</h1>
      {data.map((person, index) => (
        <Person key={person.email} index={index} />
      ))}
    </div>
  );
};

App.preLoadServerData = async () => {
  const apiUrl: string = process.env.API_URL || '';
  await preloadCachingFetch(
    apiUrl,
  );
};

export default App;
