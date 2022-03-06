export type TypeStory = {
    id: number | string
    name: string
}

export interface Story {
    chapter_id?: string
    chapter_name: string
    id: string
    name: string
    thumb: string
}

export interface History_Story extends Story{
    chapterRead?: string
    isFollow?: boolean
    readDay?: string
    followDay?: string
}

export interface ListStoryContextAPI {
    list: Story[]
    history: History_Story[]
    nav: number[]
    loading: boolean
    error: string
    getData: (id: string, page: string) => void
    searchStory: (text: string) => void
    isFl: (id: string) => number
    getHistory: () => History_Story[]
    flStory: (story, act) => void
    unFlStory: (id: string) => void
}