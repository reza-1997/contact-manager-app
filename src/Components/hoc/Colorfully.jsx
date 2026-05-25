// // NOTE: Higher Order Component(hoc)

import { BACKGROUND, BACKGROUND2, COMMENT, CYAN, ERROR, FOREGROUND, GREEN, GREEN2, GREENBLUE3, WARNING } from "../../helpers/Color"

const Colorfully = (WrappedComponent) => {

    const color = [
        BACKGROUND,
        BACKGROUND2,
        FOREGROUND,
        COMMENT,
        GREEN,
        GREEN2,
        CYAN,
        GREENBLUE3,
        ERROR,
        WARNING
    ]
    let randomColor = color[Math.floor(Math.random() * 9)];
    let styleNavbar = randomColor

    return (props) => {
        return (
            <div style={{backgroundColor:styleNavbar}} >
                <WrappedComponent {...props} />
            </div>
        );
    };
};

export default Colorfully;