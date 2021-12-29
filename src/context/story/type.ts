export type TypeStory = {
    id: number | string
    name: string
}

export type StoryProps = {
    type: TypeStory[]
    setType: any
}