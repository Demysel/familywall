import { createContext } from 'react';
import axios from 'axios';

const API_KEY = '$2a$10$j99ZptquF7iTqI/UP0xQMucBLqWZW/8bTlz859GxEqzmmfq0DpR4.';
const CALENDAR_BIN = '679b8a1bad19ca34f8f6fdc5';
const TASKS_BIN = '679b8a37ad19ca34f8f6fdce';
const SHOPPING_BIN = '679b8a65ad19ca34f8f6fded';

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const api = axios.create({
    baseURL: 'https://api.jsonbin.io/v3/b/',
    headers: { 'X-Master-Key': API_KEY }
  });

  const fetchData = async (binId) => {
    const response = await api.get(binId);
    return response.data.record;
  };

  const updateData = async (binId, newData) => {
    await api.put(binId, newData);
  };

  return (
    <ApiContext.Provider value={{ fetchData, updateData, CALENDAR_BIN, TASKS_BIN, SHOPPING_BIN }}>
      {children}
    </ApiContext.Provider>
  );
};
