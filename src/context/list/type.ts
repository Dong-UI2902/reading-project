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

export interface HistoryStory extends Story {
    chapterRead?: string
    isFollow?: boolean
    readDay?: string
    followDay?: string
    source: string
}

export interface ShareStory extends HistoryStory {
    checked: boolean
}

export interface ListStoryContextAPI {
    list: Story[]
    history: HistoryStory[]
    nav: number[]
    loading: boolean
    error: string
    getData: (id: string, page: string) => void
    searchStory: (text: string) => void
    isFl: (id: string) => number
    getHistory: () => HistoryStory[]
    flStory: (story, act) => void
    unFlStory: (id: string) => void
}