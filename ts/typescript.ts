class Circle {

    radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    createCircle(circle: Circle) {
        return new Circle(this.circle);
    }
}


class Triangle {

    height: number;

    constructor(height: number) {
        this.height = height;
        this.width = height;
        this.base = height;
    }

    createTriangle(triangle: Triangle) {
        
        return new Triangle(this.triangle);
    }


}


class Square {

    sideLength: number;

    constructor(sideLength: number) {
        this.sideLength = sideLength;
    }

    createSquare(square: Square) {
        this.square = square * square;
        return new Square(this.square);
    }

}
