import { IBorders, BorderColor } from "./types"

export const ALL_BORDERS: IBorders = {
    bt: true,
    bb: true,
    br: true,
    bl: true
}

export const NO_BORDER: IBorders = {
    bt: false,
    bb: false,
    br: false,
    bl: false
}

export const BORDER_ONLY_LEFT_RIGHT: IBorders = {
    bl: true,
    br: true,
    bt: false,
    bb: false
}
export const BORDER_ONLY_RIGHT: IBorders = {
    bl: false,
    br: true,
    bt: false,
    bb: false
}
export const BORDER_ONLY_LEFT: IBorders = {
    bl: true,
    br: false,
    bt: false,
    bb: false
}
export const BORDER__ONLY_TOP_BOTTOM: IBorders = {
    bt: true,
    bb: true,
    br: false,
    bl: false
}
export const BORDER_ONLY_TOP: IBorders = {
    bt: true,
    bb: false,
    br: false,
    bl: false
}
export const BORDER_ONLY_BOTTOM: IBorders = {
    bt: false,
    bb: true,
    br: false,
    bl: false
}


export const lightBorder: BorderColor = '#BBBBBB'
export const darkBorder: BorderColor = '#111111'