export interface StoryContextAPI {
    error: string
    loading: boolean
    getStory: (id: string) => void
}