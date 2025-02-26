import PhraseList from "./components/PhraseList";
import { usePhrases } from "./hooks/usePhrases"

function App() {
  const { phrases, remove } = usePhrases();
  return (
    <>
      <div data-testid='appComponent' />
      <PhraseList phrases={phrases} remove={remove} />
    </>
  )
}

export default App
