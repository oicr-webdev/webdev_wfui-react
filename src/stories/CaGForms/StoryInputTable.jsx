import React from 'react';
import { Description, Grid, InputField, InputTable, Listbox, ListboxOption, Selection } from '../../components/CaGForms';

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

class Example extends React.Component {
    render() {
        return (
            <InputTable {...config} children={[
                <InputField error={true} type="text" suffix="pounds" />,
                <InputField type="text" suffix="kilograms" />,
                <InputField type="text" suffix="kilograms" />,
                <InputField type="text" type={"number"} suffix="kilograms" min={0} max={10} />,
                <InputField type="text" type={"number"} suffix="kilograms" min={-10} max={10} />
            ]}>
            </InputTable>
        )
    }
}
export default <Example />