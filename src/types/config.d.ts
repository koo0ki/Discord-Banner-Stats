interface IFont {
    name: string
    max?: number
    textAlign: 'center' | 'start' | 'end'
}

interface ICoordinats {
    type: 'activeMember' | 'avatarActiveMember' | 'voiceCount' | 'memberCount' 
    x: number, y: number, size: number,
    color?: string,
    font?: IFont, 
    use: boolean
}