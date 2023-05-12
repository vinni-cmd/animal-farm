import "./App.css";
import Animal from "./components/Animal";
import useAnimalSearch from "./hooks/useAnimalSearch";

interface Animal {
  id: number;
  type: string;
  age: number;
  name: string;
}

function App() {
  const { search, animals, query } = useAnimalSearch();

  return (
    <main>
      <h1>Animal Farm</h1>
      <input
        type='text'
        placeholder='Search'
        onChange={(e) => search(e.target.value)}
        value={query}
      />
      <ul>
        {animals.map((animal: Animal) => (
          <Animal
            key={animal.id}
            {...animal}
          />
        ))}
      </ul>
      {animals.length === 0 && "No animals found"}
    </main>
  );
}

export default App;
