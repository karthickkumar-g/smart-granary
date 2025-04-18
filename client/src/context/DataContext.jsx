import { createContext, useEffect, useState } from "react";

// Create the context
export const DataContext = createContext();

// Create the provider component
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.thingspeak.com/channels/2919189/feeds.json?api_key=8WVJEQBVSEUTLELS&results=2");
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Unable to fetch data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
};
