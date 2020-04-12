"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createStringNode(data) {
    return {
        type: 'string',
        data: data,
    };
}
exports.createStringNode = createStringNode;
function createSyntaxNode(type, name, origin, data) {
    return {
        type: type,
        name: name,
        origin: origin,
        data: data,
    };
}
exports.createSyntaxNode = createSyntaxNode;
