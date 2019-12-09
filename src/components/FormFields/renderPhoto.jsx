/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    Form,
    Col,
    Button,
    FormControl,
    ControlLabel,
    HelpBlock,
} from '../index';

class renderPhoto extends React.Component {
    constructor(props) {
        super();
        this.state = { value: props.input.value };
    }

    render() {
        const {
            className,
            input,
            inline,
            label,
            required,
            help,
            placeholder,
            type,
            maxlength,
            onStateChange,
            disabled,
            preview,
            descDisplay,
            fullWidth,
            meta: { touched, error },
        } = this.props;
        const { value } = this.state;

        return value ? (
            <Form.Row
                className={classNames(
                    className,
                    'wfui-form-item',
                    {
                        'wfui-form-item-error': error,
                    },
                    { 'wfui-form-disabled': disabled },
                    { 'wfui-form-preview': preview },
                    { 'wfui-form-item-full-width': fullWidth }
                )}
            >
                {label && (
                    <Col
                        xs={12}
                        lg={inline ? 2 : 12}
                        className="wfui-form-label"
                    >
                        <ControlLabel>
                            {label}
                            {required && <b className="required"> *</b>}
                        </ControlLabel>
                    </Col>
                )}
                <Col
                    xs={12}
                    lg={
                        inline && label
                            ? descDisplay && !preview
                                ? 4
                                : 10
                            : descDisplay && !preview
                                ? 6
                                : 12
                    }
                    className={`wfui-form-field ${
                        descDisplay
                            ? 'wfui-form-field-with-description'
                            : 'wfui-form-field-no-description'
                        } wfui-form-photo file-chosen`}
                >
                    <p className="image-preview">
                        <img style={{ height: 100 }} src={value.src} />
                    </p>
                    <p className="image-alt">
                        <FormControl
                            value={value.title}
                            placeholder={
                                placeholder || placeholder === ''
                                    ? placeholder
                                    : label
                            }
                            type={type}
                            maxLength={maxlength}
                            onChange={e => {
                                const newValue = {
                                    ...value,
                                    title: e.target.value,
                                };
                                this.setState({ value: newValue });
                                onStateChange(newValue, input);
                                input.onChange(newValue);
                            }}
                            disabled={disabled}
                        />
                    </p>
                    {!disabled && (
                        <Button
                            variant="primary"
                            className="btn-remove"
                            onClick={() => {
                                input.onChange();
                                onStateChange(undefined, input);
                                this.setState({ value: undefined });
                            }}
                        >
                            Remove Image
                        </Button>
                    )}
                </Col>
                {descDisplay && !preview ? (
                    <Col
                        className="wfui-form-description"
                        xs={12}
                        lg={{ span: 6, offset: 0 }}
                    >
                        {cloneElement(descDisplay)}
                    </Col>
                ) : null}
            </Form.Row>
        ) : (
                <Form.Row className={classNames(className, 'wfui-form-item')}>
                    {label && (
                        <Col
                            xs={12}
                            lg={inline ? 2 : 12}
                            className="wfui-form-label"
                        >
                            <ControlLabel>
                                {label}
                                {required && <b className="required"> *</b>}
                            </ControlLabel>
                        </Col>
                    )}
                    <Col
                        xs={12}
                        lg={
                            inline && label
                                ? descDisplay && !preview
                                    ? 4
                                    : 10
                                : descDisplay && !preview
                                    ? 6
                                    : 12
                        }
                        className={`wfui-form-field ${
                            descDisplay
                                ? 'wfui-form-field-with-description'
                                : 'wfui-form-field-no-description'
                            } wfui-form-photo`}
                    >
                        <Dropzone
                            {...input}
                            name={input.name}
                            accept="image/png,image/jpeg,image/pjpeg,image/gif"
                            className="btn btn-primary choose-file"
                            onDrop={acceptedFiles => {
                                const reader = new FileReader();
                                reader.readAsDataURL(acceptedFiles[0]);
                                reader.onloadend = () => {
                                    const newValue = {
                                        ...value,
                                        src: reader.result,
                                    };
                                    this.setState({ value: newValue });
                                    onStateChange(newValue);
                                    return input.onChange(newValue);
                                };
                                this.setState({ hasFile: true });
                            }}
                        >
                            Choose File
                    </Dropzone>
                        {touched && error && (
                            <HelpBlock className="wfui-form-error">
                                <span>{error}</span>
                            </HelpBlock>
                        )}
                        {help && !preview && (
                            <HelpBlock className="wfui-form-help text-muted">
                                <div dangerouslySetInnerHTML={{ __html: help }} />
                            </HelpBlock>
                        )}
                    </Col>
                    {descDisplay && !preview ? (
                        <Col
                            className="wfui-form-description"
                            xs={12}
                            lg={{ span: 6, offset: 0 }}
                        >
                            {cloneElement(descDisplay)}
                        </Col>
                    ) : null}
                </Form.Row>
            );
    }
}
renderPhoto.propTypes = {
    onStateChange: PropTypes.func,
    fullWidth: PropTypes.bool,
};
renderPhoto.defaultProps = {
    onStateChange: f => f,
    fullWidth: false,
};

export default renderPhoto;
