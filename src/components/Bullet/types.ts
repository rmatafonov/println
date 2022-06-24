export type BulletModel = {
  dx: number;
  dy: number;
  targetWord: string | null;
}

export type BulletProps = {
  canvasContext: CanvasRenderingContext2D;
  bullet: BulletModel;
}
