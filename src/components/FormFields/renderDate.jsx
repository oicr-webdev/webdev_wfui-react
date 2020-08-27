/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import moment from 'moment';
import {
    FormControl,
    FormGroup,
    ControlLabel,
    HelpBlock,
    Form,
    Col,
} from '../index';
import { useState } from 'react';
import sanitizeHtml from 'sanitize-html';

const isISOString = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/;
const dateFormatString = /([12]\d{3}-(0*[1-9]|1[0-2])-(0*[1-9]|[12]\d|3[01]))/;
const isValidDate = d => {
    return d instanceof Date && !isNaN(d);
};

const RenderDate = ({
    className,
    label,
    placeholder,
    input,
    help,
    required,
    disabled,
    preview,
    descDisplay,
    globalError,
    fullWidth,
    timeZone,
    meta: { error, data },
    utcOffsetNumber,
    datePickerProps,
    onChange,
    inline,
    showErrors,
}) => {
    const [touched, setTouched] = useState(false);

    /**
     * If UI is with time, do timezone convertion. If not, use UTC all the time.
     */
    const utcOffset = datePickerProps.utcOffset
        ? datePickerProps.utcOffset
        : Number(utcOffsetNumber) / 100;
    const selectedValue = input.value ? moment(input.value).toDate() : '';

    const convertToISOString = e => {
        if (e !== null && isValidDate(new Date(e))) {
            input.onChange(e.toISOString());
        }
    };

    return (
        <Form.Row
            className={classNames(
                className,
                'wfui-form-item',
                {
                    'wfui-form-item-error':
                        (touched || showErrors) && (error || globalError),
                },
                {
                    'wfui-form-item-warning':
                        (touched || showErrors) && data && data.warning,
                },
                { 'wfui-form-disabled': disabled },
                { 'wfui-form-preview': preview },
                { 'wfui-form-item-full-width': fullWidth }
            )}
        >
            {label && (
                <Col xs={12} lg={inline ? 2 : 12} className="wfui-form-label">
                    <ControlLabel>
                        {label}
                        {required && <b className="required"> *</b>}
                    </ControlLabel>
                </Col>
            )}
            <FormGroup
                as={Col}
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
                    } wfui-form-date ${
                    (touched || showErrors) && (error || globalError)
                        ? 'wfui-form-with-error'
                        : ''
                    }`}
            // validationState={(touched || showErrors) && (error || globalError) ? 'error' : null}
            >
                <FormControl
                    isInvalid={
                        (touched || showErrors) && (error || globalError)
                    }
                    isValid={(touched || showErrors) && data && data.warning}
                    className={classNames('d-none', 'custom-form-control', {
                        'is-valid-warning':
                            (touched || showErrors) && data && data.warning,
                    })}
                />
                <div className="wfui-form-datepicker custom-form-control-wrapper">
                    <DatePicker
                        {...datePickerProps}
                        className="form-control"
                        utcOffset={utcOffset}
                        selected={selectedValue}
                        onChangeRaw={e => {
                            if (
                                e.target.value !== null &&
                                isValidDate(new Date(e))
                            ) {
                                input.onChange(e.target.value);
                            }
                        }}
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        onSelect={convertToISOString}
                        onChange={convertToISOString}
                        disabled={disabled}
                        onBlur={e => {
                            setTouched(true);
                            // This logic is needed when user manually type date string in UI and not exactly following the format 20XX-XX-XX (something like 2020-1-1 )
                            if (
                                !input.value.match(isISOString) &&
                                input.value.match(dateFormatString)
                            ) {
                                const parsedDate = new Date(input.value);
                                if (!isNaN(parsedDate)) {
                                    input.onChange(
                                        parsedDate.toISOString()
                                    );
                                }
                            }
                        }}
                        placeholderText={placeholder || 'Choose Date'}
                    />
                    {datePickerProps.showTimeSelect && (
                        <span className="timezone">
                            {`${timeZone} ${utcOffsetNumber}`}
                        </span>
                    )}
                </div>
                {(touched || showErrors) && error && (
                    <Form.Control.Feedback
                        className="wfui-form-error"
                        type="invalid"
                    >
                        {Array.isArray(error)
                            ? error.map(item => <div>{item}</div>)
                            : error}
                    </Form.Control.Feedback>
                )}
                {(touched || showErrors) && globalError && (
                    <Form.Control.Feedback
                        className="wfui-form-error"
                        type="invalid"
                    >
                        <span>
                            {Array.isArray(globalError)
                                ? globalError.join(', ')
                                : globalError}
                        </span>
                    </Form.Control.Feedback>
                )}
                {(touched || showErrors) && data && data.warning && (
                    <Form.Control.Feedback
                        className="wfui-form-warning"
                        type="valid"
                    >
                        {Array.isArray(data.warning)
                            ? data.warning.map(item => <div>{item}</div>)
                            : data.warning}
                    </Form.Control.Feedback>
                )}
                {help && !preview && (
                    <HelpBlock className="wfui-form-help text-muted">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtml(help),
                            }}
                        />
                    </HelpBlock>
                )}
            </FormGroup>
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
};
RenderDate.propTypes = {
    datePickerProps: PropTypes.object,
};
RenderDate.defaultProps = {
    datePickerProps: {
        timeFormat: 'HH:mm',
        dateFormat: 'yyyy-MM-dd HH:mm',
        showTimeSelect: true,
    },
    utcOffsetNumber: new Date().toString().match(/([-\+][0-9]+)\s/)[1],
    timeZone: new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1],
};
export default RenderDate;
