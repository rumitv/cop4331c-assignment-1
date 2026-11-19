
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const codePath = path.join(__dirname, "../js/code.js");
const source = fs.readFileSync(codePath, "utf8");

class MockXMLHttpRequest {
    constructor() {
        MockXMLHttpRequest.lastRequest = this;
        this.readyState = 0;
        this.status = 0;
    }

    open(method, url, async) {
        this.method = method;
        this.url = url;
        this.async = async;
    }

    setRequestHeader(name, value) {
        this.headers = this.headers || {};
        this.headers[name] = value;
    }

    send(body) {
        this.body = body;
    }

    respond(response, status = 200) {
        this.readyState = 4;
        this.status = status;
        this.responseText = JSON.stringify(response);

        if (typeof this.onreadystatechange === "function") {
            this.onreadystatechange();
        }
    }
}

describe("COLORS Login Integration Tests", () => {

    test("sends login JSON and handles an invalid login", () => {

        const elements = {
            loginName: { value: "testuser" },
            loginPassword: { value: "wrongpassword" },
            loginResult: { innerHTML: "" },
        };

        const app = {
            document: {
                getElementById: (id) => elements[id],
                cookie: "",
            },
            window: {
                location: { href: "index.html" },
            },
            XMLHttpRequest: MockXMLHttpRequest,
        };

        vm.runInNewContext(source, app);

        app.doLogin();

        const request = MockXMLHttpRequest.lastRequest;

        expect(request.method).toBe("POST");
        expect(request.url).toMatch(/\/Login\.php$/);

        const payload = JSON.parse(request.body);

        expect(payload).toEqual({
            login: "testuser",
            password: "wrongpassword",
        });

        request.respond({
            id: 0,
            firstName: "",
            lastName: "",
            error: "",
        });

        expect(elements.loginResult.innerHTML)
            .toMatch(/incorrect/i);

        expect(app.window.location.href).toBe("index.html");
    });

});
