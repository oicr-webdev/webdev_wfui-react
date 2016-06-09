import React from 'react';
import ReactDOM from 'react-dom';
import InputField from '../../src/InputField/input_field';
import InputTable from '../../src/InputTable/input_table';
import Description from '../../src/Description/description';
import Listbox from '../../src/Listbox/listbox';
import ListboxOption from '../../src/Listbox/listbox_option';
const css = require('../../dist/wfui.bundle.css');

let config = {
    label: "1. What is your weight measurement?",
    description: <Description type="theme-blue" content="<div><b>Before you begin</b><ol><li>Adjust your scale to zero</li><li>Weigh yourself with your clothes off, or wear light clothing. Remember to remove your shoes</li><li>Step on the scale. Make sure both feet are fully on the scale.</li></ol></div>" />,
    fieldLabel: 'Enter your Weight:',
    fieldType: 'or'
}
let config1 = {
	label: 'Cancer Type',
	placeholder: '- Select one -',
}

ReactDOM.render(
    <InputTable {...config} children={[
        <InputField error={true} type="text" suffix="pounds" />,
        <InputField type="text" suffix="kilograms" />,
        <InputField type="text" suffix="kilograms" />,
        <InputField type="text" suffix="kilograms" />,
        <InputField type="text" suffix="kilograms" />
    ]}>
    </InputTable>, 
    document.getElementById('app')
);