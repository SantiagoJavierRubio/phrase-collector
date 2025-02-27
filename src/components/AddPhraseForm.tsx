import { ComponentProps, FormEvent, useState } from "react"
import { TUsePhrases } from "../hooks/usePhrases";

type AddPhraseProps = ComponentProps<'form'> & { add: TUsePhrases['add'], onSuccess?: () => void }

export default function AddPhraseForm({ add, onSuccess, ...props }: AddPhraseProps) {

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Get the input value
        const form = e.currentTarget
        const inputs = form.elements as typeof form.elements & { phrase: HTMLInputElement }
        const value = inputs.phrase.value

        // Validate
        if (value.trim().length === 0)
            return setError('You must enter at least one non-whitespace character.')
        if (value.trim().length > 200)
            return setError("Phrase can be up to 200 characters long.")

        // If no errors set the error state to null
        setError(null)

        // Submit to phrase list without start and end whitespace
        add(value.trim())

        // Cleanup and execute any callback
        if (onSuccess) onSuccess();
        form.reset()
    }

  return (
    <form {...props} onSubmit={handleSubmit} data-testid="newPhraseForm">
        <label htmlFor="phrase" hidden>
            New phrase
        </label>
        <div className="w-full">
            <textarea 
                id="phrase"
                name="phrase"
                className="resize-none p-2 w-full"
                rows={10}
                maxLength={200}
                placeholder="Add something inspiring..."
                ref={el => el?.focus()}
                data-testid="phraseInput"
            />
            {error && <p className="text-red-500 italic text-sm mt-1" data-testid="errorMsg">* {error}</p>}
        </div>
        <input 
            type="submit"
            value="Submit"
            className="rounded-lg cursor-pointer w-full max-w-64 m-auto bg-blue-400 p-3 text-center font-semibold text-gray-50 active:bg-blue-600 hover:bg-blue-500 transition-colors"
        />
    </form>
  )
}
