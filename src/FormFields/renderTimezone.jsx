/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import TimezonePicker from 'react-timezone';
import classNames from 'classnames';
import { FormGroup, ControlLabel, HelpBlock } from '../index';

const renderTimezone = ({
    className,
    label,
    placeholder,
    input,
    help,
    required,
    disabled,
    preview,
    descDisplay,
    fullWidth,
    meta: { touched, error },
}) => (
    <div
        className={classNames(
            className,
            'wfui-form-item',
            {
                'wfui-form-item-error': touched && error,
            },
            { 'wfui-form-disabled': disabled },
            { 'wfui-form-preview': preview },
            { 'wfui-form-item-full-width': fullWidth },
        )}
    >
        {label && (
            <div className="wfui-form-label">
                <ControlLabel>
                    {label}
                    {required && <b className="required"> *</b>}
                </ControlLabel>
            </div>
        )}
        <FormGroup
            className={`wfui-form-field ${
                descDisplay
                    ? 'wfui-form-field-with-desctipton'
                    : 'wfui-form-field-no-desctipton'
            } wfui-form-time-zone`}
            validationState={touched && error ? 'error' : null}
        >
            {!disabled ? (
                <TimezonePicker
                    className="wfui-form-timezone"
                    {...input}
                    onChange={timezone => input.onChange(timezone)}
                    inputProps={{
                        placeholder,
                    }}
                />
            ) : (
                <p className="timezone-value">{input.value}</p>
            )}
            {touched && error && (
                <HelpBlock className="wfui-form-error">
                    <span>{error}</span>
                </HelpBlock>
            )}
        </FormGroup>
        {descDisplay && !preview ? cloneElement(descDisplay) : ''}
    </div>
);

export default renderTimezone;
