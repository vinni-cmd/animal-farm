import { useState, useEffect } from "react";

interface Animal {
  id: number;
  type: string;
  age: number;
  name: string;
}

export default function useAnimalSearch() {
  const [query, setQuery] = useState("");
  const [animals, setAnimals] = useState<Array<Animal>>([]);

  useEffect(() => {
    // lets use local storage api built into the browser
    const lastQuery = localStorage.getItem("lastQuery");
    search(lastQuery || "");
  }, []);

  // when refreshing browser we want to grab previous search

  async function search(term: string): Promise<void> {
    setQuery(term);
    try {
      const res = await fetch(`http://localhost:8080?q=${term}`);
      const data = await res.json();
      setAnimals(data);
      localStorage.setItem("lastQuery", term);
    } catch (error) {
      console.log(error);
    }
  }

  return { search, animals, query };
}
