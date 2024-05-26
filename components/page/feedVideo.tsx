import React from 'react'
import { $View } from '../NativeWind'
import { styled } from 'nativewind'
import { ResizeMode, Video } from 'expo-av';

const $Video = styled(Video)
const FeedVideo = (props: { URL: string, aspectRatio: Number, play: boolean }) => {
    return (
        <>
            {props.URL &&
                <$View className='flex-1'>
                    <Video
                        source={{ uri: props.URL }}
                        rate={1.0}
                        volume={1.0}
                        shouldPlay={props.play}
                        useNativeControls={true}
                        resizeMode={"cover" as ResizeMode}
                        isLooping
                        isMuted={false}
                        style={{ flex: 1, aspectRatio: props.aspectRatio.toString(), borderRadius: 14, padding: 1 }}
                    />
                </$View>
            }
        </>
    )
}
export default FeedVideo