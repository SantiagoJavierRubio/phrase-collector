import { TPhrase } from '../types/phraseType'
import { TUsePhrases } from '../hooks/usePhrases'
import { getRowSpanClassName } from './styleHelpers'

export default function PhraseList({ 
    phrases, 
    remove 
} : { 
    phrases: TPhrase[], 
    remove: TUsePhrases['remove'] 
}) {
  return (
    <div className='grid md:grid-cols-3 md:auto-rows-[50px] grid-cols-1 lg:grid-cols-4 lg:auto-rows-[25px] auto-rows-max gap-2 lg:gap-4'>
        {phrases.map(phrase => 
            <div className={`${getRowSpanClassName(phrase.text.length)}`} key={phrase.id}>
                {phrase.text}
                <button type="button" onClick={() => remove(phrase.id)}>Delete</button>
            </div>
        )}
    </div>
  )
}
