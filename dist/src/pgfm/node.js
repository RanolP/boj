"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createStringNode(data) {
    return {
        type: 'string',
        data,
    };
}
exports.createStringNode = createStringNode;
function createSyntaxNode(type, name, origin, data) {
    return {
        type,
        name,
        origin,
        data,
    };
}
exports.createSyntaxNode = createSyntaxNode;
