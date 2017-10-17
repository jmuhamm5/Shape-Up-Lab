class Shape {
	    div: HTMLDivElement;
	    radius: number;
	    height: number;
	    width: number;
	    name: string;


	    constructor(width: number, height: number){
	        this.width = width;
	        this.height = height;
	        this.name = "shape";
	        this.radius = this.height /2;
	        this.div = document.createElement('div');
	        this.div.style.backgroundColor = 'white';
	        this.div.className = 'shape';
	        this.div.style.width = width + 'px';
	        this.div.style.height = height + 'px';
	        this.div.style.left = Math.floor(Math.random() * (600 - width)) + 'px';
	        this.div.style.top = Math.floor(Math.random() * (600 - height)) + 'px';
	        document.getElementById('pad').appendChild(this.div);
	        this.div.addEventListener('click', () => {
	            this.describe();
	        });
	        this.div.addEventListener('dblclick', () => {
	            this.div.remove();
	        });
	    }
	    describe():void{
	        document.getElementById('name').innerHTML = this.name;
	        document.getElementById('wid').innerText = String(this.width);
	        document.getElementById('hei').innerHTML = String(this.height);
	        document.getElementById('rad').innerHTML = String(this.radius);
	        document.getElementById('area').innerHTML = String(this.area());
	        document.getElementById('peri').innerHTML = String(this.perimeter());
	    }
	    area(): number{
	        return this.height * this.width;
	    }
	    perimeter(): number{
	        return this.height * 2 + this.width * 2;
	    }
	}
	class Rectangle extends Shape{
	    constructor(width:number, height:number){
	            super(width, height);
	            this.name = 'Rectangle';
	            this.radius = null;
	            this.div.style.backgroundColor = 'green';
	            this.div.className = 'shape rectangle';
	    }


	}
	class Square extends Rectangle{
	    constructor(height:number){
	        super(height, height);
	        this.name = 'Square';
	        this.radius = null;
	        this.div.style.backgroundColor = 'red';
	        this.div.style.width = this.width + 'px';
	        this.div.className = 'shape square';
	    }
	}
	class Circle extends Shape{
	    constructor(radius: number){
	        super(radius*2, radius*2);
	        this.name = 'Circle';
	        this.div.style.backgroundColor = 'purple';
	        this.div.className += ' circle';
	        this.radius = radius;
	    }
	    area():number{
	       return Math.PI * Math.pow(this.radius, 2);
	    }
	    perimeter():number{
	    return 2 * Math.PI * (this.radius);
	    }
	}
	class Triangle extends Shape{
	    constructor(height: number){
	        super(height, height);
	        this.name = 'Triangle';
	        this.div.className += ' triangle';
	        this.div.style.width = '0px';
	        this.div.style.height = '0px';
	        this.radius = null;
	        this.div.style.backgroundColor = 'transparent';
	        this.div.style.borderRightWidth = this.height + 'px';
	        this.div.style.borderBottomWidth = this.height + 'px';
	    }
	    area():number {
	        return (this.height * this.height) / 2;
	    }
	    perimeter():number {
	        return 2 * this.height + (Math.sqrt(2 * Math.pow(this.height, 2)))
	    }
	}


	document.getElementById('rect').addEventListener('click', function () {
	    let wid = Number((<HTMLInputElement>document.getElementById('rectangleW')).value);
	    let hei = Number((<HTMLInputElement>document.getElementById('rectangleH')).value);
	    new Rectangle(wid, hei);
	})


	document.getElementById('sq').addEventListener('click', function () {
	    let hei = Number((<HTMLInputElement>document.getElementById('square')).value);
	    new Square(hei);
	})
	document.getElementById('cir').addEventListener('click', function () {
	    let rad = Number((<HTMLInputElement>document.getElementById('circle')).value);
	    new Circle(rad);
	})
	document.getElementById('tri').addEventListener('click', function () {
	    let hei = Number((<HTMLInputElement>document.getElementById('triangle')).value);
	    new Triangle(hei);
	})


/*


//create all of my variables to hold my inputs and containers
let rectHeight;
let rectWidth;
let squareSide;
let triHeight;
let circleRadius;
let shapesContainer;
let infoContainer;

//grab all of my inputs and containers on page load
document.addEventListener('DOMContentLoaded', () => {
    rectHeight = document.getElementById('rect-height');
    rectWidth = document.getElementById('rect-width');
    squareSide = document.getElementById('square-side');
    triHeight = document.getElementById('tri-height');
    circleRadius = document.getElementById('circle-radius');
    shapesContainer = document.getElementById('shapes-container');
    infoContainer = document.getElementById('info-container');
});

//all of my interfaces
//interface are basically a contract for objects, you are effectively saying any object of this type must have these keys and the keys' values must be of this type
//the `?` says, you can have, but don't have to have, this key
//best practice is to name interfaces with a capital `I`
interface IInfo {
    name?: string;
    perimeter?: number;
    area?: number;
}

interface IMeasurements {
    height?: number;
    width?: number;
    radius?: number;
    side?: number;
}

interface IGeometry {
    perimeter?: number;
    area?: number;
}

//base shape class
class Shape {
    div: HTMLDivElement = document.createElement('div');
    info: IInfo = {};
    pos = this.randomXY();

    //because the event listeners do not have to do with rendering the div, i put them in my constructor
    constructor() {
        this.div.addEventListener('click', () => { this.describe(); });
        this.div.addEventListener('dblclick', () => {
            this.div.remove();
            //if i remove a shape, empty out my infoContainer
            infoContainer.innerHTML = '';
        });
     }

    //my render function is what controls everything to do with the base div and putting it on the page
    render(): void {
        this.div.style.top = `${this.pos.x}px`;
        this.div.style.left = `${this.pos.y}px`;
        shapesContainer.appendChild(this.div);
    }

    describe(): void {
        //i start with an empty string
        let description = '';

        //i loop through the object
        for(const key in this.info) {
            //i add to the empty string a p tag that contains the key name : the key value
            description += `<p>${key.toUpperCase()}: ${this.info[key]}</p>`;
        }

        //then i set the innerHTML of the infoContainer to be the string of p tags
        infoContainer.innerHTML = description;
    }

    //i can specify that my function can return multiple things using the `|`
    protected validateShape(inputs: IMeasurements): Error | void {

        //the argument inputs is going to be an object
        //so i pass that object into my `isEmpty` function and that will either return true or false
        const isEmpty = this.isEmpty(inputs);
        //if any of the inputs is not a number
        const isNumber = this.isNumber(inputs);

        //if all my input values are filled with some nonempty value, then return out of this function
        if (!isEmpty && isNumber) {
            return;
        }

        //the rest of this code is constructing the error message to give the user

        //initialize an empty array, which is going to hold my keys
        let required: Array<string> = [];

        //loop through my object and push the keys into an array (e.g. ['height', 'width'])
        for(const key in inputs) {
            required.push(key);
        }

        //if there is an empty value then return a new Error object with an error
        //required is my array and `toString` turns it into a string
        //e.g. ['height', 'width'] = 'height,width'
        //and then i replace the `,` with ` and `
        let isEmptyErrorMessage: string = '';
        let isNumberErrorMessage: string = '';

        //constructing errors based on what the user did wrong
        if (isEmpty) {
            isEmptyErrorMessage += `You must input ${required.toString().replace(',', ' and ')}.`;
        }

        if (!isNumber) {
            isNumberErrorMessage += `You must input numbers, only.`;
        }

        return new Error(`${isEmptyErrorMessage} ${isNumberErrorMessage}`);
    }

    //return an object that has area and perimeter on it
    protected configureGeometry(shape: string, measurements: IMeasurements): IGeometry {
        let geometry: IGeometry = {};

        switch(shape) {
            case 'rectangle':
                geometry.area = measurements.height * measurements.width;
                geometry.perimeter = measurements.height * 2 + measurements.width * 2;
                break;
            case 'square':
                geometry.area = Math.pow(measurements.side, 2);
                geometry.perimeter = measurements.side * 4;
                break;
            case 'triangle':
                geometry.area = Math.pow(measurements.height, 2) / 2;
                geometry.perimeter = 2 * measurements.height * Math.sqrt(2 * Math.pow(measurements.height, 2));
                break;
            case 'circle':
                geometry.area = Math.PI * Math.pow(measurements.radius, 2);
                geometry.perimeter = Math.PI * 2 * measurements.radius;
                break;
        }

        geometry.area = Number(geometry.area.toFixed(2));
        geometry.perimeter = Number(geometry.perimeter.toFixed(2));

        return geometry;
    }

    private isEmpty(inputs: IMeasurements): boolean {
        for(const key in inputs) {
            if (inputs[key] === '' || inputs[key] === undefined) {
                return true;
            }
        }

        return false;
    }

    //this takes in an object and makes sure all of the values are numbers but not blank
    private isNumber(inputs: IMeasurements): boolean {
        for(const key in inputs) {
            if (isNaN(inputs[key]) && inputs[key] !== '') {
                return false;
            }
        }

        return true;
    }

    //this returns an object with a random x,y
    private randomXY(): { x: number, y: number } {
        return {
            x: Math.floor(Math.random() * 601),
            y: Math.floor(Math.random() * 601)
        };
    }
}

class Circle extends Shape {
    //set up an initial property that holds the name of my shape
    name = 'circle';

    constructor() {
        //construct my parent class (Shape)
        super();

        //call my parent's `validateShape` function and pass it my values
        const validated = this.validateShape({ radius: circleRadius.value });

        //if i got an error back from `validateShape` then alert the message of my error
        //and also return and do not make this object
        if (validated instanceof Error) {
            alert(validated.message);
            return;
        }

        //call my child class render function
        this.render();
    }

    //this is a shadowed function, meaning it has the same name as my parent class
    //so calling render from the child class or from an instance calls this render function not the parents'
    render(): void {
        this.div.className = this.name;
        this.div.style.height = `${circleRadius.value * 2}px`;
        this.div.style.width = `${circleRadius.value * 2}px`;
        //call `configureGeometry`, which will return an object with area and perimeter properties on it
        const geometry = this.configureGeometry(this.name, { radius: circleRadius.value });

        //the `...` is a way to spread an object meaning i can merge two objects together
        //this is an es6 thing
        //i.e. `this.info` with contain name, area, and perimeter
        this.info = { ...geometry, name: this.name };

        //call my parent class's render function
        super.render();
    }
}

class Triangle extends Shape {
    name = 'triangle';

    constructor() {
        super();
        const validated = this.validateShape({ height: triHeight.value });

        if (validated instanceof Error) {
            alert(validated.message);
            return;
        }

        this.render();
    }

    render(): void {
        this.div.className = this.name;
        this.div.style.borderBottom = `${triHeight.value}px solid #FFCB6F`;
        this.div.style.borderRight = `${triHeight.value}px solid transparent`;
        this.info.name = this.name;
        const geometry = this.configureGeometry(this.name, { height: triHeight.value });
        this.info = { ...geometry, name: this.name };
        super.render();
    }
}

class Rectangle extends Shape {
    name = 'rectangle';

    constructor() {
        super();
        const validated = this.validateShape({ height: rectHeight.value, width: rectWidth.value });

        if (validated instanceof Error) {
            alert(validated.message);
            return;
        }

        this.render();
    }

    render(): void {
        this.div.className = this.name;
        this.div.style.height = `${rectHeight.value}px`;
        this.div.style.width = `${rectWidth.value}px`;
        this.info.name = this.name;
        const geometry = this.configureGeometry(this.name, { height: rectHeight.value, width: rectWidth.value });
        this.info = { ...geometry, name: this.name };
        super.render();
    }
}

class Square extends Shape {
    name = 'square';

    constructor() {
        super();
        const validated = this.validateShape({ side: squareSide.value });

        if (validated instanceof Error) {
            alert(validated.message);
            return;
        }

        this.render();
    }

    render(): void {
        this.div.className = this.name;
        this.div.style.height = `${squareSide.value}px`;
        this.div.style.width = `${squareSide.value}px`;
        this.info.name = this.name;
        const geometry = this.configureGeometry(this.name, { side: squareSide.value });
        this.info = { ...geometry, name: this.name };
        super.render();
    }
}

const generateShape = (shape): void => {
    //a switch statement is a vanilla javascript mechanism
    //it's very useful when your if else statements would all be checking the same thing
    //in this case the value of `shape`
    switch(shape) {
        case 'rectangle':
            new Rectangle();
            break;
        case 'square':
            new Square();
            break;
        case 'triangle':
            new Triangle();
            break;
        case 'circle':
            new Circle();
            break;
    }
};
*/
