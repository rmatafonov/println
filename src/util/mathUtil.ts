export const mathUtil = {
    getBezierPoint: (t: number, p0: Point, p1: Point, p2: Point, p3: Point): Point => {
        const x =
            (1 - t) * (1 - t) * (1 - t) * p0.x +
            3 * (1 - t) * (1 - t) * t * p1.x +
            3 * (1 - t) * t * t * p2.x +
            t * t * t * p3.x;
        const y =
            (1 - t) * (1 - t) * (1 - t) * p0.y +
            3 * (1 - t) * (1 - t) * t * p1.y +
            3 * (1 - t) * t * t * p2.y +
            t * t * t * p3.y;

        return { x, y }
    },

    getRandomInt: (max: number): number => Math.random() * max
}
