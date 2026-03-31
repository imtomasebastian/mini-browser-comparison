import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'motion/react'

const MotionSvg = motion.svg
const MotionRect = motion.rect

const P = 220

// 7 segments totalling 48px: faintest tail → brightest head
// Each segment's dashOffset = [startOffset, startOffset - P]
const SEGMENTS = [
  { len: 6,  startOffset: 42, opacity: 0.04 },
  { len: 6,  startOffset: 36, opacity: 0.10 },
  { len: 7,  startOffset: 29, opacity: 0.22 },
  { len: 8,  startOffset: 21, opacity: 0.38 },
  { len: 8,  startOffset: 13, opacity: 0.57 },
  { len: 8,  startOffset: 5,  opacity: 0.78 },
  { len: 5,  startOffset: 0,  opacity: 1.00, cap: 'round' as const },
]

interface SegmentProps {
  progress: ReturnType<typeof useMotionValue<number>>
  len: number
  startOffset: number
  opacity: number
  cap?: 'butt' | 'round' | 'square'
}

function Segment({ progress, len, startOffset, opacity, cap = 'butt' }: SegmentProps) {
  const dashOffset = useTransform(progress, [0, 1], [startOffset, startOffset - P])
  return (
    <MotionRect
      x="0.5"
      y="0.5"
      width="89"
      height="37"
      rx="18.5"
      fill="none"
      stroke="#6B81FF"
      strokeWidth="1"
      strokeLinecap={cap}
      strokeDasharray={`${len} ${P - len}`}
      style={{ strokeDashoffset: dashOffset }}
      opacity={opacity}
    />
  )
}

export function CometBorder() {
  const progress = useMotionValue(0)

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: 2,
      ease: 'linear',
      repeat: Infinity,
    })
    return () => controls.stop()
  }, [progress])

  return (
    <MotionSvg
      className="mb-btn-comet"
      width="90"
      height="38"
      viewBox="0 0 90 38"
      aria-hidden="true"
      focusable="false"
    >
      {SEGMENTS.map((seg) => (
        <Segment key={seg.startOffset} progress={progress} {...seg} />
      ))}
    </MotionSvg>
  )
}
