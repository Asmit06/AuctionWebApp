import { create } from "zustand"

type State = {
    pageNumber: number
    pageCount: number
    searchTerm: string
    Type: string
    searchVal: string
    orderBy: string
    filterBy: string
}

type Actions = {
    setParams: (params: Partial<State>) => void
    reset: () => void
    setSearchVal: (value: string) => void
}

const seedState: State = {
    pageNumber: 1,
    pageCount: 1,
    searchTerm: '',
    Type: '',
    searchVal: '',
    orderBy: 'DateEnd',
    filterBy: 'live'
}

export const useParamsStore = create<State & Actions>()((set)=>({
    ...seedState,

    setParams: (newParams: Partial<State>) => {
        set((state) => {
            if(newParams.pageNumber) {
                return {...state, pageNumber: newParams.pageNumber}
            }else{
                return {...state, ...newParams, pageNumber: 1}
            }
        })
    },

    reset: () => set(seedState),

    setSearchVal: (value: string) => {
        set({searchVal: value})
    }
    
}));
 

