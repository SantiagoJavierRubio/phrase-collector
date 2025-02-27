import { renderHook } from "@testing-library/react"
import { usePhrases } from "./usePhrases"

describe("Use Phrases Custom Hook", () => {
    describe("Initial state", () => {

        const { result } = renderHook(() => usePhrases());
        it("Should return the hook elements", () => {
            expect(result.current).not.toBeNull()
            expect(result.current.phrases).toStrictEqual([])
            expect(result.current.add).toBeDefined()
            expect(result.current.remove).toBeDefined()
        })
    })
    
    describe("Add elements to array", () => {
        const { result } = renderHook(() => usePhrases());
        result.current.add("Testing")
        it("Should add new elements", () => {
            expect(result.current.phrases.length).toEqual(1)
            expect(result.current.phrases[0].text).toBe("Testing")
        })
    })

    describe("Remove elements from array", () => {
        const { result } = renderHook(() => usePhrases());
        const id = result.current.add("Testing")
        result.current.remove(id)
        it("Should have removed elements", () => {
            expect(result.current.phrases.length).toEqual(0)
        })

    })
})