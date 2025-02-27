import { useCallback, useState } from 'react';
import { TPhrase } from '../types/phraseType';
import { v4 as uuid } from 'uuid';

/**
 * Handles the phrase collection state. Provides a unique id for each entry.
 * @returns
 *  phrases: the phrase list
 *  add: function to add new phrases
 *  remove: function to remove phrases by id
 */
export function usePhrases() {
    const [phrases, setPhrases] = useState<TPhrase[]>([]);

    const add = useCallback((newPhrase: string) => {
        const id = uuid()
        setPhrases(prev => [...prev, {
            id,
            text: newPhrase
        }])
        return id;
    }, [])

    const remove = useCallback((id: string) => {
        setPhrases(prev => prev.filter(p => p.id !== id))
    }, [])

    return {
        phrases,
        add,
        remove
    }
}

export type TUsePhrases = ReturnType<typeof usePhrases>;