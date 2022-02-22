import { createStore } from "vuex";

const store = {
    state: {
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        moveUp: false,
        moveDown: false,
    }
};

export default createStore(store);