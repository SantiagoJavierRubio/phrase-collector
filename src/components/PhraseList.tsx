import { TPhrase } from '../types/phraseType'
import { TUsePhrases } from '../hooks/usePhrases'
import { getRowSpanClassName } from './styleHelpers'
import { GoPlus, GoTrash } from 'react-icons/go'
import { useTogglePopup } from '../hooks/useTogglePopup'
import Modal from './Modal'
import AddPhraseForm from './AddPhraseForm'
import { useMemo, useState } from 'react'
import useDebounce from '../hooks/useDebounce'

export default function PhraseList({ 
    phrases, 
    remove,
    add
} : { 
    phrases: TPhrase[];
    remove: TUsePhrases['remove'];
    add: TUsePhrases['add']
}) {

    const [search, setSearch] = useState<string>("");
    // Debounce actual value to not filter when user is still writing their input
    const debouncedSearch = useDebounce(search, 100);

    const filteredPhrases = useMemo(() => {
        if (debouncedSearch.trim().length === 0) return phrases;
        return phrases.filter(phrase => phrase.text.toLowerCase().includes(debouncedSearch.trim().toLowerCase()))
    }, [phrases, debouncedSearch])
    
    const { open, close, ref, isOpen } = useTogglePopup();

  return (
    <>
    {phrases.length > 0 && 
    <div className='flex flex-col items-start w-full gap-1 my-2'>
        <label htmlFor='searchbar'>Search by text:</label>
        <input 
            type="text" 
            id="searchbar" 
            name="searchbar" 
            data-testid="searchbar"
            className='w-full p-2 rounded-lg bg-gray-50/10'
            value={search} 
            onChange={e => setSearch(e.currentTarget.value)} 
        />
    </div>
    }
    <div className={`grid mt-6 md:grid-cols-3 md:auto-rows-[100px] grid-cols-1 lg:grid-cols-4 lg:auto-rows-[75px] auto-rows-max gap-2 lg:gap-4 transition-transform origin-center bg-transparent ${phrases.length > 0 ? 'scale-y-100' : 'scale-y-0'} alternate-color-children`}>
        {filteredPhrases.map(phrase => 
            <div
                className={`${getRowSpanClassName(phrase.text.length)} relative p-2 break-words rounded-lg w-full shadow-md shadow-gray-700 text-gray-900`} 
                key={phrase.id}
                data-testid="phrase"
                >
                {phrase.text}
                <button 
                    type="button" 
                    onClick={() => remove(phrase.id)}
                    className='text-red-600 absolute text-xl bottom-2 right-2 cursor-pointer bg-gray-100/50 rounded-lg p-1'
                    data-testid="deleteBtn"
                >
                    <GoTrash strokeWidth={0.8} />
                </button>
            </div>
        )}
        <div className='rounded-lg w-full shadow-md shadow-gray-700 row-span-1 '>
            <button 
                className='p-1 w-full h-full flex items-center justify-center flex-col gap-2 cursor-pointer bg-transparent hover:bg-gray-700/30 transition-colors active:bg-gray-700/40'
                onClick={open}
                data-testid="addNew"
                >
                <p className='text-gray-900'>Add new</p>
                <GoPlus className='bg-blue-500/50 rounded-full p-1 text-2xl' />
            </button>
        </div>
    </div>
    <Modal 
        ref={ref}
        isOpen={isOpen}
        close={close}
        className='w-96 max-w-screen p-6 pt-12 min-h-fit text-gray-900 flex flex-col'
        data-testid="modal"
    >
        {isOpen && 
        <AddPhraseForm 
            add={add}
            onSuccess={close}
            className='w-full flex flex-col items-center justify-stretch'
        />}
    </Modal>
    </>
  )
}
