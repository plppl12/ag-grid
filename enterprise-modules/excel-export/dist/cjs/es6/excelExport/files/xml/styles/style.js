"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const style = {
    getTemplate(styleProperties) {
        const { id, name } = styleProperties;
        return {
            name: 'Style',
            properties: {
                prefixedAttributes: [{
                        prefix: "ss:",
                        map: {
                            ID: id,
                            Name: name ? name : id
                        }
                    }]
            }
        };
    }
};
exports.default = style;
//# sourceMappingURL=style.js.map