
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const codePath = path.join(__dirname, "../js/code.js");
const source = fs.readFileSync(codePath, "utf8");

const app = {};
vm.runInNewContext(source, app);

describe("COLORS Front-End Unit Tests", () => {

    test("removes spaces around a color name", () => {
        const result = app.normalizeColorName("  Blue  ");

        expect(result).toBe("Blue");
    });

    test("keeps a valid color name unchanged", () => {
        const result = app.normalizeColorName("Red");

        expect(result).toBe("Red");
    });

    test("returns an empty string for blank input", () => {
        const result = app.normalizeColorName("   ");

        expect(result).toBe("");
    });

    test("handles invalid input safely", () => {
        expect(app.normalizeColorName(null)).toBe("");
        expect(app.normalizeColorName(undefined)).toBe("");
    });

});
