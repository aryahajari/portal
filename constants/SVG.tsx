import Svg, { Path } from "react-native-svg"

export const CommentIcon = ({ width, height }: { width: number, height: number }) => {
    return (
        <Svg height={`${height}px`} viewBox="0 -960 960 960" width={`${width}px`} fill="#e8eaed">
            <Path d="m40-40 78-268q-19-41-28.5-84T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80q-45 0-88-9.5T308-118L40-40Zm118-118 128-38q14-4 28.5-3t27.5 7q32 16 67 24t71 8q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 36 8 71t24 67q7 13 7.5 27.5T196-286l-38 128Zm282-162h80v-120h120v-80H520v-120h-80v120H320v80h120v120Zm39-159Z" />
        </Svg>)
}
export const BookmarkIcon = ({ width, height, isBookmarked }: { width: number, height: number, isBookmarked: boolean }) => {
    return (
        <Svg height={`${height}px`} viewBox="0 0 24 24" width={`${width}px`} fill={`${isBookmarked ? '#1fbf3a' : '#FFF'}`}>
            <Path d="M0 0h24v24H0z" fill="none" />
            <Path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
        </Svg>
    )
}
export const LikeIcon = ({ width, height, isLiked }: { width: number, height: number, isLiked: boolean }) => {
    return (
        <Svg height={`${height}px`} viewBox="0 0 24 24" width={`${width}px`} fill={`${isLiked ? '#FF5733' : '#FFF'}`}><Path d="M0 0h24v24H0z" fill="none" /><Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></Svg>
    )
}

export const NextIcon = ({ width, height }: { width: number, height: number }) => {
    return (
        <Svg height={`${height}px`} viewBox="0 -960 960 960" width={`${width}px`} fill="#e8eaed">
            <Path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
        </Svg>
    )
}
export const BackIcon = ({ width, height }: { width: number, height: number }) => {
    return (
        <Svg height={`${height}px`} viewBox="0 -960 960 960" width={`${width}px`} fill="#e8eaed">
            <Path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
        </Svg>
    )
}
export const PictureIcon = ({ width, height }: { width: number, height: number }) => {
    return (
        <Svg height={`${height}px`} viewBox="0 -960 960 960" width={`${width}px`} fill="#e8eaed">
            <Path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
        </Svg>
    )
}
export const SendIcon = ({ width, height }: { width: number, height: number }) => {
    return (
        <Svg height={`${height}px`} viewBox="0 -960 960 960" width={`${width}px`} fill="#e8eaed">
            <Path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
        </Svg>
    )
}
export const HideKeyborad = ({ width, height }: { width: number, height: number }) => {
    return (
        <Svg height={`${height}px`} viewBox="0 -960 960 960" width={`${width}px`} fill="#e8eaed">
            <Path d="M480-40 320-200h320L480-40ZM160-280q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v400q0 33-23.5 56.5T800-280H160Zm0-80h640v-400H160v400Zm160-40h320v-80H320v80ZM200-520h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80ZM200-640h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80ZM160-360v-400 400Z" />
        </Svg>

    )
}
export const LogOutIcon = ({ width, height }: { width: number, height: number }) => {
    return (
        <Svg height={`${height}px`} viewBox="0 -960 960 960" width={`${width}px`} fill="#ff0000">
            <Path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
        </Svg>
    )
}