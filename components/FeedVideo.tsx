// import { View, Text, NativeSyntheticEvent, ImageLoadEventData } from 'react-native'
// import React, { useEffect, useRef, useState } from 'react'
// import { $View, $ImageBackground, $Text, $Image } from './NativeWind'
// import { styled } from 'nativewind'
// import { Image } from 'expo-image'
// import { VideoView, useVideoPlayer } from 'expo-video';
// import { PixelRatio, StyleSheet, Button } from 'react-native';

// const $VideoView = styled(VideoView)
// const EImage = styled(Image)
// const FeedImg = (props: { URL: string, aspectRatio: Number, play: boolean }) => {
//     const ref = useRef(null);
//     const [isPlaying, setIsPlaying] = useState(true);
//     useEffect(() => {
//         if (props.play) player.muted = false
//         else player.muted = true
//     }, [props.play]);
//     const player = useVideoPlayer(props.URL, (player) => {
//         player.loop = true;
//         player.muted = true;
//         player.play();
//     });

//     useEffect(() => {
//         const subscription = player.addListener('playingChange', (isPlaying) => {
//             setIsPlaying(isPlaying);
//         });

//         return () => {
//             subscription.remove();
//         };
//     }, [player]);
//     return (
//         <>
//             {props.URL &&
//                 <$View className='w-full flex-1 p-1' key={props.URL}>
//                     <VideoView
//                         ref={ref}
//                         //style={styles.video}
//                         style={{ width: '100%', height: '100%', aspectRatio: props.aspectRatio.toString(), borderRadius: 14 }}
//                         player={player}
//                         allowsFullscreen
//                         allowsPictureInPicture
//                     />
//                 </$View>
//             }
//         </>
//     )
// }
// export default FeedImg