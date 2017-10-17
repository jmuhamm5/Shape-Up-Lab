var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
//create all of my variables to hold my inputs and containers
var rectHeight;
var rectWidth;
var squareSide;
var triHeight;
var circleRadius;
var shapesContainer;
var infoContainer;
//grab all of my inputs and containers on page load
document.addEventListener('DOMContentLoaded', function () {
    rectHeight = document.getElementById('rect-height');
    rectWidth = document.getElementById('rect-width');
    squareSide = document.getElementById('square-side');
    triHeight = document.getElementById('tri-height');
    circleRadius = document.getElementById('circle-radius');
    shapesContainer = document.getElementById('shapes-container');
    infoContainer = document.getElementById('info-container');
});
//base shape class
var Shape = /** @class */ (function () {
    //because the event listeners do not have to do with rendering the div, i put them in my constructor
    function Shape() {
        var _this = this;
        this.div = document.createElement('div');
        this.info = {};
        this.pos = this.randomXY();
        this.div.addEventListener('click', function () { _this.describe(); });
        this.div.addEventListener('dblclick', function () {
            _this.div.remove();
            //if i remove a shape, empty out my infoContainer
            infoContainer.innerHTML = '';
        });
    }
    //my render function is what controls everything to do with the base div and putting it on the page
    Shape.prototype.render = function () {
        this.div.style.top = this.pos.x + "px";
        this.div.style.left = this.pos.y + "px";
        shapesContainer.appendChild(this.div);
    };
    Shape.prototype.describe = function () {
        //i start with an empty string
        var description = '';
        //i loop through the object
        for (var key in this.info) {
            //i add to the empty string a p tag that contains the key name : the key value
            description += "<p>" + key.toUpperCase() + ": " + this.info[key] + "</p>";
        }
        //then i set the innerHTML of the infoContainer to be the string of p tags
        infoContainer.innerHTML = description;
    };
    //i can specify that my function can return multiple things using the `|`
    Shape.prototype.validateShape = function (inputs) {
        //the argument inputs is going to be an object
        //so i pass that object into my `isEmpty` function and that will either return true or false
        var isEmpty = this.isEmpty(inputs);
        //if any of the inputs is not a number
        var isNumber = this.isNumber(inputs);
        //if all my input values are filled with some nonempty value, then return out of this function
        if (!isEmpty && isNumber) {
            return;
        }
        //the rest of this code is constructing the error message to give the user
        //initialize an empty array, which is going to hold my keys
        var required = [];
        //loop through my object and push the keys into an array (e.g. ['height', 'width'])
        for (var key in inputs) {
            required.push(key);
        }
        //if there is an empty value then return a new Error object with an error
        //required is my array and `toString` turns it into a string
        //e.g. ['height', 'width'] = 'height,width'
        //and then i replace the `,` with ` and `
        var isEmptyErrorMessage = '';
        var isNumberErrorMessage = '';
        //constructing errors based on what the user did wrong
        if (isEmpty) {
            isEmptyErrorMessage += "You must input " + required.toString().replace(',', ' and ') + ".";
        }
        if (!isNumber) {
            isNumberErrorMessage += "You must input numbers, only.";
        }
        return new Error(isEmptyErrorMessage + " " + isNumberErrorMessage);
    };
    //return an object that has area and perimeter on it
    Shape.prototype.configureGeometry = function (shape, measurements) {
        var geometry = {};
        switch (shape) {
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
    };
    Shape.prototype.isEmpty = function (inputs) {
        for (var key in inputs) {
            if (inputs[key] === '' || inputs[key] === undefined) {
                return true;
            }
        }
        return false;
    };
    //this takes in an object and makes sure all of the values are numbers but not blank
    Shape.prototype.isNumber = function (inputs) {
        for (var key in inputs) {
            if (isNaN(inputs[key]) && inputs[key] !== '') {
                return false;
            }
        }
        return true;
    };
    //this returns an object with a random x,y
    Shape.prototype.randomXY = function () {
        return {
            x: Math.floor(Math.random() * 601),
            y: Math.floor(Math.random() * 601)
        };
    };
    return Shape;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        var _this = 
        //construct my parent class (Shape)
        _super.call(this) || this;
        //set up an initial property that holds the name of my shape
        _this.name = 'circle';
        //call my parent's `validateShape` function and pass it my values
        var validated = _this.validateShape({ radius: circleRadius.value });
        //if i got an error back from `validateShape` then alert the message of my error
        //and also return and do not make this object
        if (validated instanceof Error) {
            alert(validated.message);
            return _this;
        }
        //call my child class render function
        _this.render();
        return _this;
    }
    //this is a shadowed function, meaning it has the same name as my parent class
    //so calling render from the child class or from an instance calls this render function not the parents'
    Circle.prototype.render = function () {
        this.div.className = this.name;
        this.div.style.height = circleRadius.value * 2 + "px";
        this.div.style.width = circleRadius.value * 2 + "px";
        //call `configureGeometry`, which will return an object with area and perimeter properties on it
        var geometry = this.configureGeometry(this.name, { radius: circleRadius.value });
        //the `...` is a way to spread an object meaning i can merge two objects together
        //this is an es6 thing
        //i.e. `this.info` with contain name, area, and perimeter
        this.info = __assign({}, geometry, { name: this.name });
        //call my parent class's render function
        _super.prototype.render.call(this);
    };
    return Circle;
}(Shape));
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle() {
        var _this = _super.call(this) || this;
        _this.name = 'triangle';
        var validated = _this.validateShape({ height: triHeight.value });
        if (validated instanceof Error) {
            alert(validated.message);
            return _this;
        }
        _this.render();
        return _this;
    }
    Triangle.prototype.render = function () {
        this.div.className = this.name;
        this.div.style.borderBottom = triHeight.value + "px solid purple";
        this.div.style.borderRight = triHeight.value + "px solid transparent";
        this.info.name = this.name;
        var geometry = this.configureGeometry(this.name, { height: triHeight.value });
        this.info = __assign({}, geometry, { name: this.name });
        _super.prototype.render.call(this);
    };
    return Triangle;
}(Shape));
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle() {
        var _this = _super.call(this) || this;
        _this.name = 'rectangle';
        var validated = _this.validateShape({ height: rectHeight.value, width: rectWidth.value });
        if (validated instanceof Error) {
            alert(validated.message);
            return _this;
        }
        _this.render();
        return _this;
    }
    Rectangle.prototype.render = function () {
        this.div.className = this.name;
        this.div.style.height = rectHeight.value + "px";
        this.div.style.width = rectWidth.value + "px";
        this.info.name = this.name;
        var geometry = this.configureGeometry(this.name, { height: rectHeight.value, width: rectWidth.value });
        this.info = __assign({}, geometry, { name: this.name });
        _super.prototype.render.call(this);
    };
    return Rectangle;
}(Shape));
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square() {
        var _this = _super.call(this) || this;
        _this.name = 'square';
        var validated = _this.validateShape({ side: squareSide.value });
        if (validated instanceof Error) {
            alert(validated.message);
            return _this;
        }
        _this.render();
        return _this;
    }
    Square.prototype.render = function () {
        this.div.className = this.name;
        this.div.style.height = squareSide.value + "px";
        this.div.style.width = squareSide.value + "px";
        this.info.name = this.name;
        var geometry = this.configureGeometry(this.name, { side: squareSide.value });
        this.info = __assign({}, geometry, { name: this.name });
        _super.prototype.render.call(this);
    };
    return Square;
}(Shape));
var generateShape = function (shape) {
    //a switch statement is a vanilla javascript mechanism
    //it's very useful when your if else statements would all be checking the same thing
    //in this case the value of `shape`
    switch (shape) {
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
