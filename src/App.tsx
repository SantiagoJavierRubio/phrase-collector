import AddPhraseForm from "./components/AddPhraseForm";
import PhraseList from "./components/PhraseList";
import { usePhrases } from "./hooks/usePhrases"

function App() {
  const { phrases, remove, add } = usePhrases();
  return (
    <>
      <h1
        className="text-3xl font-semibold uppercase my-3"
        data-testid="appTitle"
      >
        Phrase Collection
      </h1>
      <main className="h-screen mt-8">
        {phrases.length === 0 && 
          <div className="flex items-center m-1 p-2 flex-col rounded-lg bg-gray-50/10">
            <h2 className="italic">Seems there&apos;s nothing here...</h2>
            <p className="text-2xl my-1">Add a first phrase to get things started!</p>
            <AddPhraseForm add={add} className="flex flex-col w-full p-3 gap-2" />
          </div>}
        <PhraseList phrases={phrases} remove={remove} add={add} />
      </main>
    </>
  )
}

export default App
