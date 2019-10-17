import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Popover } from 'react-bootstrap';

class DrawerPopover extends Component {
    render() {
        const {
            title,
            show,
            target,
            placement,
            handleClose,
            variant,
            bsRole,
            children,
        } = this.props;

        return (
            <Overlay
                show={show}
                target={target}
                placement={placement}
            >
                <Popover
                    bsRole={bsRole}
                    variant={variant}
                    id="popover"
                    onClick={handleClose}
                    title={title}
                >
                    {children}
                </Popover>
            </Overlay>
        );
    }
}

DrawerPopover.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]),
    show: PropTypes.bool,
    target: PropTypes.shape({}),
    handleClose: PropTypes.func,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    variant: PropTypes.string,
    bsRole: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        ]),
};

DrawerPopover.defaultProps = {
    title: null,
    show: false,
    variant: '',
    bsRole: 'popover',
    placement: 'bottom',
};

export default DrawerPopover;
