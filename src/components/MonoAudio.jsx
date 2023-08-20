import { useEffect } from "react"
import { useLoader } from "@react-three/fiber"
import * as THREE from "three"
import React from 'react'

const MonoAudio = React.forwardRef(({ url }, ref) => {
  const audioBuffer = useLoader(THREE.AudioLoader, url)

  useEffect(() => {
    if (audioBuffer) {
       // 创建一个 AudioBufferSourceNode
       const audioContext = new (window.AudioContext || window.webkitAudioContext)();
       const source = audioContext.createBufferSource();
       
       // 将加载的音频数据附加到 AudioBufferSourceNode
       source.buffer = audioBuffer;
 
       // 设置单声道输出
       const channelMerger = audioContext.createChannelMerger(2);
       channelMerger.channelCount = 1;
       source.connect(channelMerger);
 
       // 连接到音频输出
       channelMerger.connect(audioContext.destination);
 
       // 播放音频
       source.start();

       // 返回函数，在组件销毁时停止播放并清理资源
      return () => {
        source.stop();
        source.disconnect();
      };
    }
  }, [audioBuffer])

  return (
    null
  )
})

export default MonoAudio
