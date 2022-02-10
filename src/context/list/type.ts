export type TypeStory = {
    id: number | string
    name: string
}

export type Story = {
    chapter_id: string
    chapter_name: string
    id: string
    name: string
    thumb: string
}

export interface ListStoryContextAPI {
    list: Story[]
    nav: number[]
    loading: boolean
    error: string
    getData: (id: string, page: string) => void
}