import React, { FC, useEffect } from 'react'
import { destroyEnemy } from '@/redux/enemiesSlice';
import { useAppDispatch } from '@/redux/store/hooks';
import { BulletProps } from './types';

const Bullet: FC<BulletProps> = ({ canvasContext, bullet }) => {
  const dispatch = useAppDispatch()

  const {
    dx, dy, targetWord
  } = bullet;
  const startCoords = {
    dx: 250,
    dy: 813.0400000000001,
  }
  const steps = 60
  let step = 0
  const time = 1000;
  const animate = () => {
    const stepTime = time / steps
    canvasContext.beginPath();
    if (!step) {
      canvasContext.arc(startCoords.dx, startCoords.dy, 8, 0, 2 * Math.PI);
      setTimeout(() => {
        canvasContext.clearRect(startCoords.dx - 8, startCoords.dy - 8, 18, 18)
      }, stepTime);
    } else {
      const stepCoordX = (startCoords.dx - dx) / steps
      const stepCoordY = (startCoords.dy - dy) / steps
      const currentX = startCoords.dx - (stepCoordX * step)
      const currentY = startCoords.dy - (stepCoordY * step)
      canvasContext.arc(currentX, currentY, 8, 0, 2 * Math.PI);
      setTimeout(() => {
        canvasContext.clearRect(currentX - 8, currentY - 8, 18, 18)
      }, stepTime);
    }
    canvasContext.fillStyle = '#ffff60'
    canvasContext.fill();
    canvasContext.closePath();
    if (step < steps) {
      step += 1
      requestAnimationFrame(animate)
    }
  }

  useEffect(() => {
    if (targetWord) {
      animate()
    }
    if (targetWord?.length === 1) {
      setTimeout(() => {
        dispatch(destroyEnemy())
      }, time);
    }
  }, [targetWord])

  return <></>
}

export default Bullet;
